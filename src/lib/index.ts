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

import { headingReg, ulistReg, quoteReg, olistReg, codeStartReg, codeEndReg, delimiterReg } from "./regexp";
import { HeadingLevel, MDElement, FlowElement, OListDelimiter, UListSign } from "../types";
import { renderToHtml } from "./render";
import { wrapHtmlTemplate } from "./html";

/* The main parse logic */
export function parse(markdown: string, hasStyle?: boolean): string {
  /* Split markdown content to many lines */
  const crlfReg = /\r?\n/;
  const lines = markdown.split(crlfReg);
  // console.log(lines);

  const mdElements = parseToElements(lines);
  // console.log(mdElements);
  const html = renderToHtml(mdElements);

  return hasStyle ? wrapHtmlTemplate(html) : html;
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
    // Code End
    if (lastFlowElement?.type === 'code') {
      if (codeEndReg.test(line)) {
        flush();
      } else {
        lastFlowElement.items.push(line);
      }
      continue;
    }

    // Empty line
    if (!line.trim()) {
      flush();
      continue;
    }

    // Delimiter
    if (delimiterReg.test(line)) {
      flush();
      mdElements.push({ type: 'delimiter' });
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
      if (lastFlowElement?.type === 'olist' && lastFlowElement.delimiter === olistM[2]) {
        lastFlowElement.items.push(olistM[3].trim());
      } else {
        flush();
        lastFlowElement = {
          type: 'olist',
          start: parseInt(olistM[1]),
          delimiter: olistM[2] as OListDelimiter,
          items: [olistM[3].trim()]
        }
      }
      continue;
    }

    // Code Start
    const codeStartM = line.match(codeStartReg);
    if (codeStartM) {
      flush();
      lastFlowElement = {
        type: 'code',
        lang: codeStartM[1],
        items: []
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

  // Avoid the last element is omitted
  flush();
  return mdElements;
}

