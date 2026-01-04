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

interface ListBlock extends MDBlockBasic {
  type: 'list';
}

interface CodeBlock extends MDBlockBasic {
  type: 'code';
}

export type MultiLinesBlock =
  TextBlock  |
  QuoteBlock |
  ListBlock  |
  CodeBlock;

export type MDBlock = MultiLinesBlock | HeadingBlock;

