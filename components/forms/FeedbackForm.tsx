import React from 'react'
import { useRouter } from 'next/router'
import { Field, Form } from 'react-final-form'

export function FeedbackForm() {
  const router = useRouter()
  const [formStatus, setFormStatus] = React.useState(null)

  function handleSubmitForm(values) {
    const formData = {
      Date: new Date().toDateString(),
      slug: router.asPath,
      ...values,
    }

    fetch('/api/feedback', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(formData),
    }).then(response => {
      if (response.ok) {
        setFormStatus('Success')
      } else {
        setFormStatus('Error')
      }
    })
  }
  return (
    <Form onSubmit={handleSubmitForm}>
      {props => (
        <form onSubmit={props.handleSubmit}>
          <label>
            <Field
              component="input"
              id="reaction-good"
              type="radio"
              name="Review"
              value="Good"
            />
            👍
          </label>
          <label>
            <Field
              component="input"
              id="reaction-bad"
              type="radio"
              name="Review"
              value="Bad"
            />
            👎
          </label>
          <label htmlFor="comment">Tell us your thoughts:</label>
          <Field component="textarea" id="comment" name="Comment"></Field>
          <label htmlFor="email">Your Email (optional):</label>
          <Field component="input" type="email" id="email" name="Email"></Field>
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </Form>
  )
}
