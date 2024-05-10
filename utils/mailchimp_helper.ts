import jsonp from 'jsonp';
import { validate } from 'email-validator';
import mailchimp from '@mailchimp/mailchimp_marketing';


mailchimp.setConfig({
  apiKey: 'p758b512d14cfd5cfe1379082118efe9d-us20',
  server: 'us20', 
});

/**
 * Subscribe an email address to a Mailchimp email list.
 * @param {String} email - required; the email address you want to subscribe
 * @return {Object} - result and message indicating subscription status
 */
export const addToMailchimp = async function addToMailchimp(email) {
  const listId = 'c1062536a1';
  const url = `https://${'us20'}.api.mailchimp.com/3.0/lists/${listId}/members`;
  console.log(`Mailchimp API URL: ${url}`);
  
  if (!validate(email)) {
    return {
      result: 'error',
      msg: 'The email you entered is not valid.',
    };
  }

    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'pending', 
    });

    console.log('API response:', response)
};
