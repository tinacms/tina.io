// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React from 'react';
import { EmailForm } from '@/component/modals/EmailForm';

export const NewsletterBlock = (props) => {
  return <EmailForm isFooter={props?.style === 'small' || false} />;
};
