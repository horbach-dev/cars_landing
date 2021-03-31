import React, { useState } from "react";
import classes from "classnames";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from "./StepsSection.module.css";

const StepsSection = ({ handleOpenModel }) => {
    const [step, setStep] = useState(0)

    const handlePrevSlide = () => {
        if (step > 0) {
            setStep(prev => prev - 1)
        } else {
            setStep(slides.length - 1)
        }
    }

    const handleNextSlide = () => {
        if (step < slides.length - 1) {
            setStep(prev => prev + 1)
        } else {
            setStep(0)
        }
    }

    const slides = [
        { title: 'Контакт с нами', desc: 'Предварительно связываемся с вами по телефону, ' +
                'уточняем предварительные нюансы и назначем время и место встречи.', time: '~ 5 минут', img: 'first-step.png' },
        { title: 'Осмотр автомоблия', desc: 'Приезжаем на удобную для Вас площадку.' +
                ' Проводим осмотр вашего автомобиля.', time: '~ 10 - 30 минут', img: 'second-slide.png' },
        { title: 'Получаем деньги', desc: 'Оценщик называет корректную цену,' +
                ' мы подготавливеам необходимые документы и покупаем Ваш авто.', time: '~ 10 - 60 минут', img: 'money.png' }
    ]

    return (
        <div className={styles.ThirdSection}>
            <div className="container">
                <h3 className="section-title">Этапы совершения сделки</h3>
                <p className="section-desc">
                    Всего несколько простых шагов для продажи Вашего автомобиля.
                </p>
                <div className={styles.featuresBlock}>
                    <div className={styles.actionButtons}>
                        <Button
                            type="primary"
                            className={styles.actionBtn}
                            shape="circle"
                            onClick={handlePrevSlide}
                            icon={<LeftOutlined />}
                        />
                        <Button
                            type="primary"
                            className={styles.actionBtn}
                            shape="circle"
                            onClick={handleNextSlide}
                            icon={<RightOutlined />}
                        />
                    </div>
                    { slides.map((i, index) => {
                        return (
                            <div key={i.title} className={styles.featuresItem}>
                                {step === index && <span className={styles.decor}>{index + 1}</span>}
                                <div className={classes(styles.featuresContent, step === index && styles.active)}>
                                    <p className={styles.featuresTitle}>{i.title}</p>
                                    <p className={styles.featuresDesc}>{i.desc}</p>
                                    <div className= {styles.time}>{i.time}</div>
                                </div>
                                <div className={styles.featuresPicture}>
                                    <div style={{
                                        backgroundImage: `url('/images/third-section/${i.img}')`
                                    }} className={classes(styles.featuresPictureItem, step === index && styles.picActive)} />
                                </div>
                            </div>
                        )
                    }) }
                </div>
            </div>
        </div>
    );
};

export default StepsSection;
