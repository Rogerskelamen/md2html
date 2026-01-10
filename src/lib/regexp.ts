/* For markdown line pattern pair */
const headingReg = /^\s*(#{1,6})(?:\s+|$)(.*)$/;
const quoteReg = /^>\s*(.*)$/;
const ulistReg = /^\s*([-+*])(?:\s+|$)(.*)$/;
const olistReg = /^\s*(\d+)(.|\))(?:\s+|$)(.*)$/;
const codeStartReg = /^```([^`]*)$/;
const codeEndReg = /^```\s*$/;

const boldItalicReg = /(\*\*\*|___)([^*_]+)\1/g;
const boldReg = /(\*\*|__)([^*_]+)\1/g;
const italicReg = /([*_])([^*_]+)\1/g;
const inlineCodeReg = /(`+)([^`]+?)\1/g;
const hyperlinkReg = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export {
  headingReg,
  quoteReg,
  ulistReg,
  olistReg,
  codeStartReg,
  codeEndReg,
  inlineCodeReg,
  hyperlinkReg,
  boldItalicReg,
  boldReg,
  italicReg
};
