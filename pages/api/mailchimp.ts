import mailchimp from '@mailchimp/mailchimp_marketing'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  })

  const { email_address, status, merge_fields } = req.body
  try {
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      { email_address, status, merge_fields }
    )
    res.status(200).json({ success: true, response })
  } catch (err) {
    res.status(500).json({ error: true, message: err.message })
  }
}
