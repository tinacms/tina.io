

export const sanitizeLabel = (label) => {
    if (!label) {
      return
    }
    return label
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
  }