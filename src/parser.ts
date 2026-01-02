/* The main parse logic */
export function parse(content: string): string {
  const source = content.trim();
  return `<p>${source}</p>`;
}

