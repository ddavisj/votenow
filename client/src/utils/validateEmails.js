const re =
   /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const validateEmails = emails => {
   const invalidEmails = emails
      .split(',')
      .map(email => email.trim())
      .filter(email => re.test(email) === false);
   //   .filter(email => !email === '');

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
