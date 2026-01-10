const headingReg = /^\s*(#{1,6})(?:\s+|$)(.*)$/;
const quoteReg = /^>\s*(.*)$/;
const ulistReg = /^\s*([-+*])(?:\s+|$)(.*)$/;
const olistReg = /^\s*(\d+)(.|\))(?:\s+|$)(.*)$/;
const codeStartReg = /^```([^`]*)$/;
const codeEndReg = /^```\s*$/;

export {
  headingReg,
  quoteReg,
  ulistReg,
  olistReg,
  codeStartReg,
  codeEndReg
};
