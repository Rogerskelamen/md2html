export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface MDBlockBasic {
  content: string;
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

interface UListBlock extends MDBlockBasic {
  type: 'ulist';
  sign: 'minus' | 'plus' | 'star';
}

interface OListBlock extends MDBlockBasic {
  type: 'olist';
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

