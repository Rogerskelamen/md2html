/**
 * When a scope in Markdown is of `code` type,
 * the content inside this area must not be parsed as either Markdown or HTML.
 * It should be treated as pure text content.
 * Therefore, it can not carry any semantic representation in HTML.
 * This function is intended to remove all such representations.
 */
export function escapeHtml(content: string): string {
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const DEFAULT_STYLE = `
body {
  margin: 0 auto;
  max-width: 650px;
  line-height: 1.6;
  font-size: 18px;
  color: #444;
  padding: 50px;
}
h1, h2, h3 {
  line-height: 1.2;
}
body > pre {
  background-color: #f8f8f8;
  padding: 18px;
  font-size: 85%;
  border-radius: 5px;
}
p > code {
  padding: 3px 5px;
  border-radius: 5px;
  background-color: #f4f4f4;
  font-size: 85%;
}
blockquote {
  margin: 0;
  border-left: 4px solid #dfe2e5;
  padding: 0 1rem;
}
blockquote > p {
  margin: 0;
  color: #888;
}
`;

export function wrapHtmlTemplate(content: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown preview</title>
  <style>
${DEFAULT_STYLE.trim()}
  </style>
</head>
<body>
${content.trim()}
</body>
</html>`;
}

