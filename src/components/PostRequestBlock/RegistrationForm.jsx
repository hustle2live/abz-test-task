import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';

import '@material/web/textfield/outlined-text-field.js';
import '@material/web/field/outlined-field.js';
import '@material/web/radio/radio.js';

import * as helpers from '../../features/helpers.js';
import { ErrorMessage } from '../ErrorMessage/Error.jsx';
import { fetchPositions, postNewUser } from '../../redux/actions/actions.js';

import global from '../../styles/styles.module.scss';

import styles from './RegistrationForm.module.scss';

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
      setError,
   } = useForm({
      mode: 'all',
   });

   const onSubmit = (data) => {
      const formData = helpers.setFormData(data);
      dispatch(postNewUser(formData));
   };

   const loadImageHandler = (imgNode, file) => {
      const height = imgNode.height;
      const width = imgNode.width;
      console.log(width + ' x ' + height + ' px ');
      const sizeIsOk = helpers.checkImgResolution(height, width);

      if (!sizeIsOk) {
         setError('userFile', {
            type: 'manual',
            message: 'Invalid file format! Min size is 70x70 px.',
         });
         setImgData(null);
      } else setImgData(file);
   };

   function onChangePicture(data) {
      const file = helpers.firstNode(data);

      if (file) {
         const reader = new FileReader();

         reader.addEventListener('load', () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => loadImageHandler(img, file);
         });

         reader.readAsDataURL(file);
      } else setImgData(null);
   }

   return (
      <section className={global.container}>
         <h3 className={`${styles.sectionTitle} ${global.heading}`}>
            Working with POST request
         </h3>
         <form
            className={styles.formSubmit}
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
         >
            <div className={styles.textFieldsGroup}>
               <md-outlined-text-field
                  {...register('userName', {
                     minLength: {
                        value: 2,
                        message: 'Min length is 2 ',
                     },
                     maxLength: {
                        value: 60,
                        message: 'Max length is 60 ',
                     },
                     pattern: {
                        value: helpers.regExpName,
                        message:
                           'Only allowed letters A-Z and symbols [a-z а-я `,.-]',
                     },
                     required: 'Empty field!',
                  })}
                  label="Your name"
                  type="text"
                  error-text={errors.userName?.message || 'Invalid name format'}
                  error={errors.userName}
                  supporting-text={errors.userName?.message || ' '}
               ></md-outlined-text-field>

               <md-outlined-text-field
                  {...register('userEmail', {
                     minLength: {
                        value: 2,
                        message: 'Min length is 2',
                     },
                     maxLength: {
                        value: 100,
                        message: 'Max length is 100',
                     },
                     pattern: {
                        value: helpers.regExpEmail,
                        message: 'Not correct email format!',
                     },
                     required: 'Empty field!',
                  })}
                  label="Email"
                  type="email"
                  error-text={
                     errors.userEmail?.message || 'Not correct email format!'
                  }
                  error={errors.userEmail}
                  supporting-text={' '}
               ></md-outlined-text-field>

               <md-outlined-text-field
                  {...register('userPhone', {
                     pattern: {
                        value: helpers.regExpPhone,
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
                  })}
                  label="Phone"
                  type="phone"
                  error-text={
                     errors.userPhone?.message || 'Not correct phone format!'
                  }
                  error={errors.userPhone}
                  supporting-text="+38 (XXX) XXX - XX - XX"
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
                  className={styles.fileUpload__fileInput}
                  error={errors.userFile}
                  label="Upload"
               >
                  <input
                     className={styles.fileUpload__fileInput__hidden}
                     {...register('userFile', {
                        validate: {
                           MoreThan5MB: (files) =>
                              helpers.fileSizeValidation(files) ||
                              'Max size 5mb',
                           ImageResValidation: (files) =>
                              onChangePicture(files),
                        },
                        pattern: {
                           value: imgData,
                           message: 'Invalid image! Min size is 70x70 px',
                        },
                        required: 'Empty field!',
                     })}
                     type="file"
                     id="avatar"
                     accept="image/jpg, image/jpeg"
                  />
               </md-outlined-field>

               <md-outlined-field
                  error={errors.userFile}
                  htmlFor="avatar"
                  className={styles.fileUpload__label}
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

            {postNewUserError && <ErrorMessage error={postNewUserError} />}

            <input
               type="submit"
               className={global.buttonPrimary}
               value={'Sign up'}
               disabled={!isValid}
            />
         </form>
      </section>
   );
};
