import { validate } from 'email-validator'

interface SubscriptionResult {
  result: 'success' | 'error'
  message: string
}

export async function addToMailchimp(
  email: string,
  firstName?: string,
  lastName?: string
): Promise<SubscriptionResult> {
  if (!validate(email)) {
    return {
      result: 'error',
      message: 'The email you entered is not valid.',
    }
  }

  const mergeFields: { FNAME?: string; LNAME?: string } = {};
  if (firstName) mergeFields.FNAME = firstName;
  if (lastName) mergeFields.LNAME = lastName;

  try {
    const response = await fetch('/api/mailchimp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: mergeFields,
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add email to the list.')
    }
    return {
      result: 'success',
      message: 'Email successfully added to the list.',
    }
  } catch (error) {
    return {
      result: 'error',
      message: error.message || 'Failed to add email to the list.',
    }
  }
}
