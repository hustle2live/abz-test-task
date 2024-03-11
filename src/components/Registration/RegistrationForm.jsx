import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import '@material/web/textfield/outlined-text-field.js';
import '@material/web/field/outlined-field.js';
import '@material/web/radio/radio.js';

import { postNewUser } from '../../redux/actions/actions.js';

import {
   cutElementsName,
   regExpEmail,
   regExpName,
   regExpPhone,
   setFormData,
} from '../../features/helpers.js';

import global from '../../styles/styles.module.scss';

import styles from './RegistrationForm.module.scss';

export const Register = () => {
   const dispatch = useDispatch();

   const {
      register,
      formState: { errors, isValid },
      handleSubmit,
      getValues,
   } = useForm({
      mode: 'onTouched',
   });

   const userFiles = getValues('userFile');
   const userFilesDidUpload = () => userFiles && !!userFiles.length;

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
               <div className={styles.radioGroup__element}>
                  <md-radio
                     {...register('userPosition')}
                     id="first-radio"
                     value={1}
                     aria-label="First"
                     className={styles.radioGroup__element}
                     label="Frontend developer"
                  ></md-radio>
                  <label htmlFor="first-radio">Frontend developer</label>
               </div>
               <div className={styles.radioGroup__element}>
                  <md-radio
                     className={styles.radioGroup__element}
                     {...register('userPosition')}
                     value={2}
                     label="Backend Developer"
                     checked
                     id="second-radio"
                     aria-label="Second"
                  ></md-radio>
                  <label htmlFor="second-radio">Backend Developer</label>{' '}
               </div>
               <div className={styles.radioGroup__element}>
                  <md-radio
                     className={styles.radioGroup__element}
                     {...register('userPosition')}
                     value={3}
                     label="Designer"
                     id="third-radio"
                     aria-label="Third"
                  ></md-radio>
                  <label htmlFor="third-radio">Designer</label>
               </div>
               <div className={styles.radioGroup__element}>
                  <md-radio
                     className={styles.radioGroup__element}
                     {...register('userPosition', {
                        required: true,
                     })}
                     value={4}
                     label="QA"
                     id="fourth-radio"
                     aria-label="Fourth"
                  ></md-radio>
                  <label htmlFor="fourth-radio">QA</label>
               </div>
            </div>
            <div className={styles.fileUpload}>
               <md-outlined-field
                  className={styles.fileUpload__fileInput}
                  error={errors.userFile}
                  label="Upload"
                  error-text={errors.userFile?.message || ''}
               >
                  <input
                     className={styles.fileUpload__fileInput__hidden}
                     {...register('userFile', {
                        validate: {
                           MoreThan5MB: (files) =>
                              files[0]?.size / 1024 < 5120 || 'Max 5mb',
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
                        {cutElementsName(userFiles[0])}
                     </span>
                  ) : (
                     <span className={styles.fileUpload__label}>
                        Upload your photo
                     </span>
                  )}
               </md-outlined-field>
            </div>

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
