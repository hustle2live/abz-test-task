import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useInView } from 'react-hook-inview';

import '@material/web/progress/circular-progress.js';

import { actions as usersActionCreator } from '../../redux/userReducer/user.slice.js';
import { fetchUsers } from '../../redux/actions/actions.js';
import { formatPhone } from '../../features/helpers.js';

import global from '../../styles/styles.module.scss';
import logo from '../../assets/images/photo-cover.svg';

import styles from './Candidates.module.scss';

export const Candidates = () => {
   const { status, error, usersArray, usersLimit, usersTotal, successSend } =
      useSelector((state) => state.userReducer);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchUsers(usersLimit));
   }, [dispatch, successSend, usersLimit]);

   const LoadingElement = () => (
      <div className={styles.loadingElement}>
         <md-circular-progress
            className={styles.loadingElement}
            value="0.5"
            indeterminate
            aria-label="Page loading progress"
         ></md-circular-progress>
      </div>
   );

   const ErrorMessage = (props) => (
      <div className={global.errorMessage}>
         <p> An error occured : {props.error}</p>
      </div>
   );

   const [ref, isVisible] = useInView({
      threshold: 0,
   });

   return (
      <section ref={ref} className={global.container}>
         <h2 className={global.heading}>
            Working with GET request
         </h2>
         <div className={styles.candidates}>
            {usersArray && usersArray.length
               ? usersArray.map(
                  ({ id, name, phone, photo, position, email }) => (
                     <li key={id} className={styles.candidates__card}>
                        <div className={styles.candidates__photo}>
                           <img
                              src={photo && isVisible ? photo : logo}
                              alt={'candidate pict'}
                           />
                        </div>
                        <p className={styles.candidates__name}>{name}</p>
                        <div className={styles.candidates__description}>
                           <p
                              className={
                                 styles.candidates__description_position
                              }
                           >
                              {position}
                           </p>
                           <div className={global.tooltip}>
                              <p
                                 className={
                                    styles.candidates__description_email
                                 }
                              >
                                 {email}
                              </p>
                              <span className={global.tooltiptext}>
                                 {email}{' '}
                              </span>
                           </div>
                           <p
                              className={styles.candidates__description_phone}
                           >
                              {formatPhone(phone)}
                           </p>
                        </div>
                     </li>
                  ),
               )
               : null}
         </div>
         {status === 'loading' && <LoadingElement />}
         {error && <ErrorMessage error={error} />}

         <button
            className={`${styles.more} ${global.buttonPrimary}`}
            onClick={() => dispatch(usersActionCreator.increaseUsersLimit())}
            disabled={!(usersLimit < usersTotal)}
         >
            Show more
         </button>
      </section>
   );
};
