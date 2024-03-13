import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';

import '@material/web/textfield/outlined-text-field.js';
import '@material/web/field/outlined-field.js';
import '@material/web/radio/radio.js';

import { postNewUser } from '../../redux/actions/actions.js';

import {
   cutElementsName,
   fileSizeValidation,
   regExpEmail,
   regExpName,
   regExpPhone,
   setFormData,
} from '../../features/helpers.js';

import { fetchPositions } from '../../redux/actions/actions.js';

import { ErrorMessage } from '../ErrorMessage/Error.jsx';

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

   const {
      register,
      formState: { errors, isValid },
      handleSubmit,
      getValues,
   } = useForm({
      mode: 'onTouched',
   });

   const userFiles = getValues('userFile');
   const userFilesDidUpload = () =>
      userFiles?.length > 0 ? userFiles[0] : false;

   const onSubmit = (data) => {
      const formData = setFormData(data);
      dispatch(postNewUser(formData));
   };

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
                        value: regExpName,
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
                        value: regExpEmail,
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
                              fileSizeValidation(files) || 'Max size 5mb',
                        },
                        required: true,
                     })}
                     type="file"
                     id="avatar"
                     accept="image/jpg, image/jpeg"
                     error={errors.userFile}
                  />
               </md-outlined-field>

               <md-outlined-field
                  error={errors.userFile}
                  htmlFor="avatar"
                  className={styles.fileUpload__label}
               >
                  {userFilesDidUpload() ? (
                     <span className={styles.fileUpload__label_fill}>
                        {cutElementsName(userFilesDidUpload())}
                     </span>
                  ) : (
                     <span className={styles.fileUpload__label}>
                        Upload your photo
                     </span>
                  )}
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
