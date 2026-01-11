/**
 * When a scope in Markdown is of `code` type,
 * the content inside this area must not be parsed as either Markdown or HTML.
 * It should be treated as pure text content.
 * Therefore, it can not carry any semantic representation in HTML.
 * This function is intended to remove all such representations.
 */
export function escapeHtml(content: string): string {
  return content;
}

