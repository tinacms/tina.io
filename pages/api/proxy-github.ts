import { apiProxy } from 'next-tinacms-github'

export default apiProxy(process.env.SIGNING_KEY)
