export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type UListSign = '-' | '+' | '*';
export type OListDelimiter = '.' | ')';

/* *
 * 'line element' means this element is render as one line, no crossing line.
 * On the other hand, 'block element' gathers lots of lines as one structure.
 */
interface MDLineElement {
  content: string;
}

interface MDBlockElement {
  items: string[];
}

interface TextElement extends MDLineElement {
  type: 'text';
}

interface DelimiterElement {
  type: 'delimiter';
}

interface HeadingElement extends MDLineElement {
  type: 'heading';
  level: HeadingLevel;
}

interface QuoteElement extends MDLineElement {
  type: 'quote';
}

interface UListElement extends MDBlockElement {
  type: 'ulist';
  sign: UListSign;
}

interface OListElement extends MDBlockElement {
  type: 'olist';
  start: number;
  delimiter: OListDelimiter;
}

interface CodeElement extends MDBlockElement {
  type: 'code';
  lang: string;
}

export type FlowElement =
  TextElement  |
  QuoteElement |
  UListElement |
  OListElement |
  CodeElement;

export type MDElement = FlowElement | HeadingElement | DelimiterElement;

