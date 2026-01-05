const headingReg = /^\s*(#{1,6})(?:\s+|$)(.*)$/;
const quoteReg = /^>\s*(.*)$/;
const ulistReg = /^\s*([-+*])$/;
const olistReg = /^$/;

export {
  headingReg,
  quoteReg,
  ulistReg,
  olistReg,
};
