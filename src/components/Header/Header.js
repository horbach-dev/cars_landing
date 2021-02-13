import React from 'react';
import PhoneIcon from './PhoneIcon'

import styles from './Header.module.css'
import { Button } from "antd";

const Header = ({ handleOpenModel }) => {
  return(
    <header className={styles.header}>
      <div className='flex center'>
        <div className={styles.logo}>
          <img src="images/logo.png" alt=""/>
        </div>
        <div className={styles.where}>
          По всей беларуси!
        </div>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.work}>
          <span className={styles.indicator} />
          Сейчас работаем
        </div>
        <a href="tel:+375259531799" className={styles.phone}>
          <PhoneIcon/><span>+375 (25) 953-17-99</span>
        </a>
        <Button type="primary" onClick={handleOpenModel}>Оценить авто</Button>
      </div>
    </header>
  )
}

export default Header;
