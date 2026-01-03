export type HeaderLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type TextQuoteBlock = TextBlock | QuoteBlock;

interface MDBlockBasic {
  content: string;
}

interface TextBlock extends MDBlockBasic {
  type: 'text';
}

interface HeaderBlock extends MDBlockBasic {
  type: 'header';
  level: HeaderLevel;
}

interface QuoteBlock extends MDBlockBasic {
  type: 'quote';
}

interface CodeBlock extends MDBlockBasic {
  type: 'code';
}

export type MDBlock =
  TextBlock   |
  HeaderBlock |
  QuoteBlock  |
  CodeBlock;
