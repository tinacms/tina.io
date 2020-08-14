import Airtable from 'airtable'

interface FeedbackRecord {
  Date: string
  Comment: string
  Review: 'Good' | 'Bad'
  Email?: string
}

export default function feedback(req, res) {
  const base = Airtable.base('appmrIEGfi6XWeXaY')

  const fields: FeedbackRecord = {
    Date: new Date().toDateString(),
    Comment: 'What a wonderful world.',
    Review: 'Good',
    Email: 'test@example.com',
  }

  base('Site Feedback').create([{ fields }], function(err, records) {
    if (err) {
      console.error(err)
      res.json({ message: 'Uh oh spagehtti-o' })
      return
    }

    res.json({ message: 'Thanks for your feedback!' })
  })
}
