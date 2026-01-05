export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type UListSign = '-' | '+' | '*';
export type OListDelimiter = '.' | ')';

interface MDBlockBasic {
  content: string;
}

interface ListBlockBasic {
  items: string[];
}

interface TextBlock extends MDBlockBasic {
  type: 'text';
}

interface HeadingBlock extends MDBlockBasic {
  type: 'heading';
  level: HeadingLevel;
}

interface QuoteBlock extends MDBlockBasic {
  type: 'quote';
}

interface UListBlock extends ListBlockBasic {
  type: 'ulist';
  sign: UListSign;
}

interface OListBlock extends ListBlockBasic {
  type: 'olist';
  delimiter: OListDelimiter;
}

interface CodeBlock extends MDBlockBasic {
  type: 'code';
}

export type MultiLinesBlock =
  TextBlock  |
  QuoteBlock |
  UListBlock |
  OListBlock |
  CodeBlock;

export type MDBlock = MultiLinesBlock | HeadingBlock;

