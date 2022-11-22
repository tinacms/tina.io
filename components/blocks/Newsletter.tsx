import { EmailForm } from '../../components/forms'
import React from 'react'

export const NewsletterBlock = (props) => {
  return <EmailForm isFooter={props?.style === 'small' || false} />
}
