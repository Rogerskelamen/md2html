import { MDElement } from "../types";
import { escapeHtml } from "./escapeHtml";
import { boldItalicReg, boldReg, linkReg, inlineCodeReg, italicReg, imgReg } from "./regexp";

/* traverse markdown content elements and wrap text with tags at proper positions. */
export function renderToHtml(mdElements: MDElement[]): string {
  let result = '';

  for (const element of mdElements) {
    const type = element.type;

    switch (type) {
      case 'text':
        result += `<p>${inlineParse(element.content)}</p>\n`;
        break;
      case 'heading':
        result += `<h${element.level}>${inlineParse(element.content)}</h${element.level}>\n`;
        break;
      case 'delimiter':
        result += `<hr>\n`;
        break;
      case 'quote':
        result += `<quote>${inlineParse(element.content)}</quote>\n`;
        break;
      case 'ulist':
        result += '<ul>\n' +
          element.items
            .map(item => `  <li>${inlineParse(item)}</li>`)
            .join('\n') +
          '\n</ul>\n';
        break;
      case 'olist':
        result += `<ol start="${element.start}">\n` +
          element.items
            .map(item => `  <li>${inlineParse(item)}</li>`)
            .join('\n') +
          '\n</ol>\n';
        break;
      case 'code':
        result += '<pre>\n' +
          element.items
            .map(item => `<code>${escapeHtml(item)}</code>`)
            .join('\n') +
          '\n</pre>\n';
        break;
    }
  }

  return result;
}

function inlineParse(content: string): string {
  const placeholders: string[] = [];
  let idx = 0;

  /* Make placeholders for code */
  const stash = (html: string): string => {
    const key = `\u0000${idx}\u0000`;
    placeholders.push(html);
    idx++;
    return key;
  }

  // 1. code
  content = content
    .replace(inlineCodeReg, (_, __, code) =>
      stash(`<code>${code}</code>`)
    );

  // 2. link and emphasis
  content = content
    .replace(imgReg, '<img src="$2" alt="$1">')
    .replace(linkReg, '<a href="$2">$1</a>')
    .replace(boldItalicReg, '<strong><em>$2</em></strong>')
    .replace(boldReg, '<strong>$2</strong>')
    .replace(italicReg, '<em>$2</em>');

  // 3. restore codes
  content = content.replace(/\u0000(\d+)\u0000/g, (_, i) =>
    escapeHtml(placeholders[i])
  );

  return content;
}

