import React from "react";
import classes from "classnames";
import { Button } from "antd";

import styles from "./FeaturesSection.module.css";

const FeaturesSection = ({ handleOpenModel }) => {

  const guaranties = [
    { text: 'Моментальная оценка br рыночной стоимости', desc: 'Объективно оцениваем, анализируем все факторы и рассчитываем наиболее близкую к реальной стоимость авто.' },
    { text: 'Индивидуальный подход br к каждому', desc: 'Рассматриваем разные частные случаи и в каждом стараемся сдалеть продажу автомобиля удобной для нашего клиента.' },
    { text: 'Деньги за авто br в течение дня', desc: 'Процесс продажи вашего автомобиля состовит не более 24 часов.' },
    { text: 'Юридическая и br финансовая безопасность', desc: 'Обеспечиваем полную прозрачность и безопасность сделки.' },
  ];

  const what = [
    {
      title: "В хорошем состянии",
      desc: "Машины которые внешне и внутренне в нормальном состоянии и на ходу",
      img: "first",
    },
    {
      title: "Неисправные авто",
      desc: "Машины которые имеют дефекты кузова и/или ходовая часть которых нарушена",
      img: "second",
    },
    {
      title: "Аварийные авто",
      desc: "Автомобили после серьезных дорожно-транспортных происшествий (ДТП)",
      img: "third",
    },
  ];

  return (
    <div className={styles.FeaturesSection}>
      <div className="container">
        <div className={styles.guarantyBlock}>
          {guaranties.map(item => {
            const str = item.text.split('br')
            return (
                <div key={item.text} className={styles.guarantyItem}>
                  <div className={styles.guarantyIcon} />
                  <div className={styles.guarantyText}>
                    <p className={styles.guarantyTextTop}>
                      {str[0]} <br /> {str[1]}
                    </p>
                    <p className={styles.guarantyTextBottom}>
                      {item.desc}
                    </p>
                  </div>
                </div>
            )
          })}
        </div>
        <div className={classes(styles.topBlock, "flex between")}>
          <div>
            <h3 className="section-title">Какие машины мы выкупаем?</h3>
            <p className="section-desc">
              Мы выкупаем автомобили практически в любом состоянии и любого года, поэтому
              будем рады обсудить любой вариант.
            </p>
          </div>
          <Button
            type="primary"
            onClick={handleOpenModel}
          >
            Предложить авто
          </Button>
        </div>
        <div className={styles.whatCars}>
          {what.map((item) => {
            return (
              <div key={item.title} className={styles.whatCarsItem}>
                <p className={styles.whatCarsTitle}>{item.title}</p>
                <div
                  className={classes(styles.whatCarsImg, styles[item.img])}
                />
                <p className={styles.whatCarsDesc}>{item.desc}</p>
              </div>
            );
          })}
        </div>
        <Button
            type="primary"
            className={styles.bottomButton}
            onClick={handleOpenModel}
        >
          Оценить автомобиль
        </Button>
      </div>
    </div>
  );
};

export default FeaturesSection;
