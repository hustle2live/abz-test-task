import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import '@material/web/textfield/outlined-text-field.js';
import '@material/web/field/outlined-field.js';
import '@material/web/radio/radio.js';

import {
   ErrorMessage,
   fetchPositions,
   global,
   helpers,
   postNewUser,
   styles,
   textFieldValidation,
} from './common.js';

export const Register = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchPositions());
   }, [dispatch]);

   const state = useSelector((state) => state.userReducer);
   const positions = state.fetchPositions;
   const { postNewUserError, fetchPositionsError } = state.errors;
   const [imgData, setImgData] = useState(null);
   const {
      register,
      formState: { errors, isValid },
      handleSubmit,
   } = useForm({
      mode: 'all',
   });

   const onFormSubmit = (data) => {
      const formData = helpers.setFormData(data);
      dispatch(postNewUser(formData));
   };

   const handleImgLoad = (file) => setImgData(file);

   const handleImgFail = (errorMessage = false) => {
      setImgData(null);
      return errorMessage;
   };

   const userFileValidation = {
      validate: {
         MoreThan5MB: (files) =>
            helpers.fileSizeValidation(files) || 'Max size 5mb',
         ImageResValidation: (files) =>
            helpers.fileReaderValidation(files, handleImgLoad, handleImgFail) ||
            'Min size is 70x70',
      },
      pattern: {
         value: imgData,
         message: 'Invalid image! Min size is 70x70 px',
      },
      required: 'Empty field!',
   };

   const PostUserErrorHandler = () =>
      postNewUserError && <ErrorMessage error={postNewUserError} />;

   return (
      <section className={global.container}>
         <h3 className={`${styles.sectionTitle} ${global.heading}`}>
            Working with POST request
         </h3>
         <form
            className={styles.formSubmit}
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onFormSubmit)}
         >
            <div className={styles.textFieldsGroup}>
               <md-outlined-text-field
                  {...register('userName', textFieldValidation.userName)}
                  label="Your name"
                  type="text"
                  supporting-text={errors.userName?.message || ' '}
                  error={errors.userName}
                  error-text={errors.userName?.message || 'Invalid name format'}
               ></md-outlined-text-field>

               <md-outlined-text-field
                  {...register('userEmail', textFieldValidation.userEmail)}
                  label="Email"
                  type="email"
                  supporting-text={' '}
                  error={errors.userEmail}
                  error-text={
                     errors.userEmail?.message || 'Not correct email format!'
                  }
               ></md-outlined-text-field>

               <md-outlined-text-field
                  {...register('userPhone', textFieldValidation.userPhone)}
                  label="Phone"
                  type="phone"
                  supporting-text="+38 (XXX) XXX - XX - XX"
                  error={errors.userPhone}
                  error-text={
                     errors.userPhone?.message || 'Not correct phone format!'
                  }
               ></md-outlined-text-field>
            </div>

            <div
               className={styles.radioGroup}
               role="radiogroup"
               aria-labelledby="group-title"
            >
               <p id="group-title" className={styles.radioGroup__title}>
                  Select your position
               </p>
               {positions?.map((pos, index) => (
                  <div
                     key={`radio-${pos.id}`}
                     className={styles.radioGroup__element}
                  >
                     <md-radio
                        {...register('userPosition')}
                        id={`radio-${pos.id}`}
                        value={pos.id}
                        className={styles.radioGroup__element}
                        label={pos.name}
                        checked={index === 1 ? true : undefined}
                     ></md-radio>
                     <label htmlFor={`radio-${pos.id}`}>{pos.name}</label>
                  </div>
               ))}
               {fetchPositionsError && (
                  <ErrorMessage error={fetchPositionsError} />
               )}
            </div>

            <md-outlined-field
               class={styles.fileUpload}
               spacing={0}
               error={errors.userFile}
               error-text={errors.userFile?.message || 'Empty Field!'}
            >
               <md-outlined-field
                  label="Upload"
                  className={styles.fileUpload__fileInput}
                  error={errors.userFile}
               >
                  <input
                     className={styles.fileUpload__fileInput__hidden}
                     {...register('userFile', userFileValidation)}
                     type="file"
                     id="avatar"
                     accept="image/jpg, image/jpeg"
                  />
               </md-outlined-field>
               <md-outlined-field
                  className={styles.fileUpload__label}
                  htmlFor="avatar"
                  error={errors.userFile}
               >
                  <span
                     className={
                        imgData
                           ? styles.fileUpload__label_fill
                           : styles.fileUpload__label
                     }
                  >
                     {!errors.userFile && imgData
                        ? helpers.cutElementsName(imgData)
                        : 'Upload your photo'}
                  </span>
               </md-outlined-field>
            </md-outlined-field>

            <input
               type="submit"
               className={global.buttonPrimary}
               value={'Sign up'}
               disabled={!isValid}
            />

            <PostUserErrorHandler />
         </form>
      </section>
   );
};
