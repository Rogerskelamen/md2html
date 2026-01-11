/* For markdown line pattern pair */
const headingReg = /^\s*(#{1,6})(?:\s+|$)(.*)$/;
const delimiterReg = /^\s*((?:\*+\s*){3,}|(?:-+\s*){3,}|(?:_+\s*){3,})$/;
const quoteReg = /^>\s*(.*)$/;
const ulistReg = /^\s*([-+*])(?:\s+|$)(.*)$/;
const olistReg = /^\s*(\d+)(.|\))(?:\s+|$)(.*)$/;
const codeStartReg = /^```([^`]*)$/;
const codeEndReg = /^```\s*$/;

/* For text inline pattern pair */
const inlineCodeReg = /(`+)([^`]+?)\1/g;
const imgReg = /!\[([^\]]+)\]\(([^)\s]+)\)/g;
const linkReg = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const boldItalicReg = /(\*\*\*|___)([^*_]+)\1/g;
const boldReg = /(\*\*|__)([^*_]+)\1/g;
const italicReg = /([*_])([^*_]+)\1/g;

export {
  headingReg,
  delimiterReg,
  quoteReg,
  ulistReg,
  olistReg,
  codeStartReg,
  codeEndReg
};

export {
  inlineCodeReg,
  imgReg,
  linkReg,
  boldItalicReg,
  boldReg,
  italicReg
};

