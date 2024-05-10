import mailchimp from '../pages/api/mailchimp';
import { validate } from 'email-validator';

interface SubscriptionResult {
  result: 'success' | 'error';
  message: string;
}

export async function addToMailchimp(email: string): Promise<SubscriptionResult> {
  if (!validate(email)) {
    return {
      result: 'error',
      message: 'The email you entered is not valid.'
    };
  }

  try {
    const listId = process.env.MAILCHIMP_LIST_ID || '';
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'pending'  
    });
    console.log('API response:', response);
    return {
      result: 'success',
      message: 'Email successfully added to the list.'
    };
  } catch (error) {
    console.error('Error adding to Mailchimp:', error);
    return {
      result: 'error',
      message: 'Failed to add email to the list.'
    };
  }
}
