import { boldItalicReg, boldReg, hyperlinkReg, inlineCodeReg, italicReg } from "./regexp";

export function inlineParse(content: string): string {
  return content
    .replace(inlineCodeReg, '<code>$2</code>')
    .replace(hyperlinkReg, '<a href="$2">$1</a>')
    .replace(boldItalicReg, '<strong><em>$2</em></strong>')
    .replace(boldReg, '<strong>$2</strong>')
    .replace(italicReg, '<em>$2</em>');


  // return content;
}

export function htmlToPlainText(content: string): string {
  return content;
}
