export function openGraphImage(
  title: string,
  altSuffix: string = '',
  author: string = ''
) {
  const base =
    'https://res.cloudinary.com/forestry-demo/image/upload/l_text:tuner-regular.ttf_70:'

  const encodedTitle =
    encodeURIComponent(title) +
    ',g_north_west,x_270,y_95,w_840,c_fit,co_rgb:EC4815/l_text:tuner-regular.ttf_35:'

  const encodedAuthor = author
    ? encodeURIComponent(author) +
      ',g_north_west,x_270,y_500,w_840,c_fit,co_rgb:241748/v1581087220/TinaCMS/tinacms-social-empty.png'
    : ''

  return {
    url: base + encodedTitle + encodedAuthor,
    width: 1200,
    height: 628,
    alt: title + altSuffix,
  }
}
