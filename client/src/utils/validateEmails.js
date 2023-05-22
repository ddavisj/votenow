const regex =
   /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const validateEmails = emails => {
   //Trim spaces from emails string
   emails = emails.trim();

   // Remove commas if present at end
   const removedEndComma =
      emails.slice(-1) === ',' ? emails.slice(0, -1) : emails;

   const emailsArr = removedEndComma.split(',');
   if (emailsArr.length > 2) {
      return 'Currently, you can only send up to 2 emails per survey';
   }

   const invalidEmails = emails
      .split(',')
      .map(email => email.trim())
      .filter(email => regex.test(email) === false);

   if (invalidEmails[0] === '') {
      return;
   }

   // Remove falsy (nulls or empty strings)
   const nonNullEmails = invalidEmails.filter(Boolean);

   if (nonNullEmails.length) {
      return `These emails are invalid: ${nonNullEmails}`;
   }

   return;
};

export default validateEmails;
