//Gets the Document Ids for blog post formatting headers
export const getDocId = (label) => {
  if (!label) {
    return;
  }

  const cleanId = label
    .toLowerCase()
    .replace(/^\s*"|"\s*$/g, '-')
    .replace(/^-*|-*$/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  if (cleanId === '' || cleanId === '-') {
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
      const char = label.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return `heading-${Math.abs(hash).toString(16).substring(0, 8)}`;
  }

  return cleanId;
};
