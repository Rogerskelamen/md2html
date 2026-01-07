/**
 * Since AST-based parsing is too complex and not
 * suitable for a personal typescript learning project,
 * So I just let my markdown rendering engine to
 * receive a line and analysis which type it is,
 * and then output the corresponding format(with tags).
 * That means it's just a simple line-by-line parsing.
 *
 * Some special scenes still need to be handled carefully:
 * plain text -> <p>plain text</p>
 * need to consider whether there is a following empty line.
 * Cause
 * ```
 * plain text 1
 * plain text 2
 * ```
 * is one paragraph NOT two.
 * The same happens with quote text:
 * ```
 * > quote text
 * plain text
 * ```
 * is one paragraph as well.
 */

import { headingReg, ulistReg, quoteReg, olistReg } from "./regexp";
import { HeadingLevel, MDElement, FlowElement, OListDelimiter, UListSign } from "./type";

/* The main parse logic */
export function parse(markdown: string): string {
  /* Split markdown content to many lines */
  const crlfReg = /\r?\n/;
  const lines = markdown.split(crlfReg);
  // console.log(lines);

  const mdBlocks = parseToElements(lines);
  // console.log(mdBlocks);
  const html = handleTags(mdBlocks);

  return html;
}

/**
 * Traverse lines to turn to markdown elements with different well-designed structures
 */
function parseToElements(lines: string[]): MDElement[] {
  let lastFlowElement: FlowElement | null = null;
  const mdElements: MDElement[] = [];

  /* Push last flow text element into the return value */
  const flush = () => {
    if (lastFlowElement) {
      mdElements.push(lastFlowElement);
      lastFlowElement = null;
    }
  }

  for (const line of lines) {
    // Empty line
    if (!line.trim()) {
      flush();
      continue;
    }

    // Headings
    const headingM = line.match(headingReg);
    if (headingM) {
      flush();
      mdElements.push({
        type: 'heading',
        level: headingM[1].length as HeadingLevel,
        content: headingM[2].trim()
      });
      continue;
    }

    // Quote
    const quoteM = line.match(quoteReg);
    if (quoteM) {
      /* Last line is quote as well */
      if (lastFlowElement?.type === 'quote') {
        lastFlowElement.content += ' ' + quoteM[1].trim();
      } else {
        flush();
        lastFlowElement = {
          type: 'quote',
          content: quoteM[1].trim()
        };
      }
      continue;
    }

    // Unordered List
    const ulistM = line.match(ulistReg);
    if (ulistM) {
      if (lastFlowElement?.type === 'ulist' && lastFlowElement.sign === ulistM[1]) {
        lastFlowElement.items.push(ulistM[2].trim());
      } else {
        flush();
        lastFlowElement = {
          type: 'ulist',
          sign: ulistM[1] as UListSign,
          items: [ulistM[2].trim()]
        }
      }
      continue;
    }

    // Ordered List
    const olistM = line.match(olistReg);
    if (olistM) {
      if (lastFlowElement?.type === 'olist' && lastFlowElement.delimiter === olistM[1]) {
        lastFlowElement.items.push(olistM[2].trim());
      } else {
        flush();
        lastFlowElement = {
          type: 'olist',
          delimiter: olistM[1] as OListDelimiter,
          items: [olistM[2].trim()]
        }
      }
      continue;
    }

    // Fall back to plain text
    if (
      lastFlowElement &&
      ['text', 'quote', 'ulist', 'olist'].includes(lastFlowElement.type)
    ) {
      if (lastFlowElement.type === 'ulist' || lastFlowElement.type === 'olist') {
        lastFlowElement.items[lastFlowElement.items.length-1] += ' ' + line.trim();
      } else {
        lastFlowElement.content += ' ' + line.trim();
      }
    } else {
      flush();
      lastFlowElement = {
        type: 'text',
        content: line.trim()
      };
    }
  }

  // Avoid the last block is omitted
  flush();
  return mdElements;
}

/* traverse markdown content blocks and wrap text with tags at proper positions. */
function handleTags(mdBlocks: MDElement[]): string {
  let result = '';

  for (const block of mdBlocks) {
    const type = block.type;

    switch (type) {
      case "text":
        result += `<p>${signToTag(block.content)}</p>\n`;
        break;
      case "heading":
        result += `<h${block.level}>${signToTag(block.content)}</h${block.level}>\n`;
        break;
      case "quote":
        result += `<blockquote>${signToTag(block.content)}</blockquote>\n`;
        break;
      case 'ulist':
        result += '<ul>\n' +
          block.items
            .map(item => `  <li>${signToTag(item)}<li>`)
            .join('\n') +
          '\n</ul>\n';
        break;
      case 'olist':
        result += '<ol>\n' +
          block.items
            .map(item => `  <li>${signToTag(item)}<li>`)
            .join('\n') +
          '\n</ol>\n';
        break;
      case "code":
    }
  }

  return result;
}

function signToTag(content: string): string {
  return content;
}
