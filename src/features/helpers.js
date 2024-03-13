const cutLength = 14;
const extensionLength = -4;
const bytesToKBytesDenominator = 1024;
const MaxFileSizeKbytes = 5120;

const fileSizeValidation = (files = null) => {
   if (!files) return false;
   return (
      files[0]?.size / bytesToKBytesDenominator < MaxFileSizeKbytes || false
   );
};

const cutElementsName = (obj = null) => {
   if (!obj?.name) return false;

   return [...obj.name]
      .slice(0, cutLength)
      .slice(0, extensionLength)
      .concat('... ' + [...obj.name].slice(extensionLength).join(''))
      .join('');
};

const regExpName = /^[a-z а-яёЁЇїІіЄєҐґ ,.'-]+$/i;

const regExpEmail =
   // eslint-disable-next-line max-len, no-control-regex
   /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

// eslint-disable-next-line no-useless-escape
const regExpPhone = /^[\+]{1}380([0-9]{9})$/;

const formatPhone = (phone) => {
   const cut = (a, b) => phone.slice(a, b);
   return `${cut(0, 3)} (${cut(3, 6)}) ${cut(6, 9)} ${cut(9, 11)} ${cut(11)}`;
};

const validateImageSize = (files) => {
   const file = files[0];
   const reader = new FileReader();
   reader.onload = (r) => {
      const img = new Image();
      img.src = r.target.result;
      img.onload = function () {
         const height = this.height;
         const width = this.width;
         if (height < 70 || width < 70) {
            return 'at least 70px.';
         }
         return true;
      };
   };
   reader.readAsDataURL(file);
};

const setFormData = (data) => {
   if (!data) return null;
   try {
      const { userPosition, userName, userEmail, userPhone, userFile } = data;

      const formData = new FormData();
      formData.append('position_id', userPosition);
      formData.append('name', userName);
      formData.append('email', userEmail);
      formData.append('phone', userPhone);
      formData.append('photo', userFile[0]);

      return formData;
   } catch (error) {
      return error.message;
   }
};

export {
   cutElementsName,
   fileSizeValidation,
   formatPhone,
   regExpEmail,
   regExpName,
   regExpPhone,
   validateImageSize,
   setFormData,
};
