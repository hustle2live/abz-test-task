import BackgroundImage from '../../assets/images/1x1.png';
import Logo from '../../assets/images/Logo.svg';

import global from '../../styles/styles.module.scss';

import styles from './Header.module.scss';

export const Header = () => {
   return (
      <header>
         <div id="top" className={styles.navbar}>
            <div className={styles.navbar__container}>
               <div className={styles.navbar__logo}>
                  <a href="#top">
                     <img src={Logo} alt="logo svg" />
                  </a>
               </div>
               <div className={styles.navbar__buttons}>
                  <button className={global.buttonPrimary}>Users</button>
                  <button className={global.buttonPrimary}>Sign up</button>
               </div>
            </div>
         </div>
         <div className={styles.content}>
            <div className={styles.content_background}>
               <img
                  src={BackgroundImage}
                  alt="wheat field and blue sky as Ukraine freedom"
               />
            </div>
            <h1 className={styles.content__title}>
               Test assignment for front-end developer
            </h1>
            <p className={styles.content__text}>
               What defines a good front-end developer is one that has skilled
               knowledge of HTML, CSS, JS with a vast understanding of User
               design thinking as they'll be building web interfaces with
               accessibility in mind. They should also be excited to learn, as
               the world of Front-End Development keeps evolving.
            </p>
            <button className={global.buttonPrimary}>Sign up</button>
         </div>
      </header>
   );
};
