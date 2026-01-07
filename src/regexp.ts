const headingReg = /^\s*(#{1,6})(?:\s+|$)(.*)$/;
const quoteReg = /^>\s*(.*)$/;
const ulistReg = /^\s*([-+*])(?:\s+|$)(.*)$/;
const olistReg = /^\s*(\d+)(.|\))(?:\s+|$)(.*)$/;

export {
  headingReg,
  quoteReg,
  ulistReg,
  olistReg,
};
