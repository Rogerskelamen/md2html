import { boldItalicReg, boldReg, linkReg, inlineCodeReg, italicReg, imgReg } from "./regexp";

export function inlineParse(content: string): string {
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
    htmlToPlainText(placeholders[i])
  );

  return content;
}

export function htmlToPlainText(content: string): string {
  return content;
}
