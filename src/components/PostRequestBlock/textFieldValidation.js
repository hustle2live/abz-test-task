import {
   regExpEmail,
   regExpName,
   regExpPhone,
} from '../../features/helpers.js';

const textFieldValidation = {
   userName: {
      minLength: {
         value: 2,
         message: 'Min length is 2 ',
      },
      maxLength: {
         value: 60,
         message: 'Max length is 60 ',
      },
      pattern: {
         value: regExpName,
         message: 'Only allowed letters A-Z and symbols [a-z а-я `,.-]',
      },
      required: 'Empty field!',
   },
   userEmail: {
      minLength: {
         value: 2,
         message: 'Min length is 2',
      },
      maxLength: {
         value: 100,
         message: 'Max length is 100',
      },
      pattern: {
         value: regExpEmail,
         message: 'Not correct email format!',
      },
      required: 'Empty field!',
   },
   userPhone: {
      pattern: {
         value: regExpPhone,
         message:
            'Phone number should starta with +380 and fill only 0-9 digits',
      },
      minLength: {
         value: 12,
         message: 'Min length is 12',
      },
      maxLength: {
         value: 13,
         message: 'Max length is 13',
      },
      required: '+38 (XXX) XXX - XX - XX',
   },
};

export { regExpEmail, regExpName, regExpPhone, textFieldValidation };
