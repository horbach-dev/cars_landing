import React from 'react'
import styles from './Footer.module.css'
import PhoneIcon from "../Header/PhoneIcon";

const Footer = () => {
  return(
    <footer className={styles.Footer}>
      <div className="container">
        <div className={styles.FooterWrap}>
          <div className={styles.FooterLeft}>
            <img src="images/logo-dark.png" alt=""/>
            <p>Вся предоставленная информация на сайте не является публичной офертой и
              носит исключительно информативный характер.
              По всем вопросам и предложениям обращаться по телефону.</p>
          </div>
          <div className={styles.FooterRight}>
            <h5 className={styles.FooterTitle}>
              Наши контакты
            </h5>
            <a href="tel:+375447452679" className={styles.FooterPhone}>
              <PhoneIcon/><span>+375 (44) 745-26-79</span>
            </a>
            <a href="viber://chat?number=%2B375447452679" className={styles.FooterPhone}>
              <PhoneIcon viber /><span>Viber</span>
            </a>
            <p className={styles.FooterAddress}>
              УНП 391084896 <br/>
              Выкуп авто Республика Беларусь © 2020
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
