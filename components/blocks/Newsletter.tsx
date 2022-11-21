import React from 'react'
import { EmailForm } from 'components/forms'

export const NewsletterBlock = (props) => {
  return <EmailForm isFooter={props?.style === 'small' || false} />
}
