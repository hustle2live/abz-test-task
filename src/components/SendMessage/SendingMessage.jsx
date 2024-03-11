import SuccessImage from '../../assets/images/success-image.svg';

import styles from './SendingMessage.module.scss';

export const SuccessMessage = () => (
   <div className={styles.register__message}>
      <p className={styles.register__message__text}>
         User successfully registered
      </p>
      <div className={styles.register__message__picture}>
         <img src={SuccessImage} alt="User succesfully send a mail" />
      </div>
   </div>
);
