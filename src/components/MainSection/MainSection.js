import React from 'react';
import classes from 'classnames';
import MainSectionForm from './MainSectionForm'

import styles from './MainSection.module.scss'

const MainSection = ({ complete, handleComplete }) => {

  const images = ['One', 'Two']

  return(
    <div className={styles.firstSection}>
      <div className={styles.firstSectionBg}/>
      <div className="container">
        <div className={styles.firstSectionMiddle}>
          <div className={styles.firstSectionLeft}>
            <h1 className={styles.firstSectionTitle}>Купим вашу машину <span>в день подачи заявки</span></h1>
            <p className={styles.firstSectionOffer}>Срочный <br/>выкуп авто</p>
            <p className={styles.firstSectionDesc}>
              Получите моментальную оценку Вашего авто, завполнив несколько полей ниже!
            </p>
          </div>
          <div className={styles.firstSectionRight}>
            {images.map(image => {
              return <div key={image} className={classes(styles.picture, styles['picture' + image])} />
            })}
          </div>
        </div>
        <MainSectionForm complete={complete} handleComplete={handleComplete} />
      </div>
    </div>
  )
}

export default MainSection;
