export function extractTextFromBody(
  body: any,
  maxLength: number = 200,
): string {
  let textContent = '';

  function traverse(node: any) {
    if (node.type === 'text' && node.text) {
      textContent += `${node.text} `;
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(traverse);
    }
  }
  if (body && Array.isArray(body.children)) {
    body.children.forEach(traverse);
  }
  const excerpt = textContent.trim().slice(0, maxLength);

  return excerpt.length === maxLength ? `${excerpt}...` : excerpt;
}
