import React, { useRef, useState, useEffect } from 'react'
import classnames from "classnames";
import styles from './CompletedScreen.module.scss';
import {Button} from "antd";

const CompletedScreen = ({ complete }) => {
  return(
    <div className={classnames(styles.completedScreen, complete && styles.completed)}>
      <div className={styles.completedScreenContent}>
        <p className={styles.completedScreenTitle}>
          Успешно отправлено
        </p>
        <p className={styles.completedScreenDesc}>
          Ваши данные были отправлены в адресс нашей мониторинговой системы. Мы перезвоним вам как можно скорее (до 10 минут).
        </p>
        {/*<Button className={styles.completedScreenButton} type="primary" onClick={close}>Изменить данные</Button>*/}
      </div>
    </div>
  )
}

export default CompletedScreen;
