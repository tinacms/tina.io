import { previewHandler } from 'next-tinacms-github'

export default previewHandler(process.env.SIGNING_KEY)
