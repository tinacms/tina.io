//Gets the Document Ids for blog post formatting headers 
export const getDocId = (label) => {
    if (!label) {
      return;
    }
    return label
      .toLowerCase()
      .replace(/^\s*"|"\s*$/g, '-')
      .replace(/^-*|-*$/g, '')  
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '');
  };
  