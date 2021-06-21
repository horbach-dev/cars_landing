import React from 'react';
import classes from 'classnames';
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
        <a href="tel:+375447452679" className={styles.phone}>
          <PhoneIcon/><span>+375 (44) 745-26-79</span>
        </a>
        <a href="viber://chat?number=%2B375447452679" className={classes(styles.phone, styles.viber)}>
          <PhoneIcon viber />
        </a>
        <Button type="primary" onClick={handleOpenModel}>Оценить авто</Button>
      </div>
    </header>
  )
}

export default Header;
