export const startPreview = async () => {
  await fetch(`/api/preview`)
  window.location.href = window.location.pathname
}
