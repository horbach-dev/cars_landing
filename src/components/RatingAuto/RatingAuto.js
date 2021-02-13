import React from 'react';
import RatingAutoForm from '../../components/RatingAutoForm'

import styles from './RatingAuto.module.css'


const RatingAuto = ({ complete, handleComplete, mark }) => {

    const what = [
        'Талон техосмотра',
        "Удостоверение личности (паспорт)",
        "Технический паспорт транспортного средства",
        'Документы о сервисном обслуживании (если есть)',
        'Генеральная доверенность (если вы не собственник)',
        "Комплект ключей",
    ];


    return(
        <div className={styles.RatingAuto}>
            <div className="container">
                <h3 className="section-title">Оценка авто онлайн</h3>
                <p className="section-desc">
                    Заполните информацию об автомобиле и получите ответ по цене как можно скорее.
                </p>
                <div className={styles.flex}>
                <RatingAutoForm complete={complete} handleComplete={handleComplete} mark={mark} />
                <div className={styles.whatNeed}>
                    <h4 className="section-semi-title">Что необходимо для купли-продажи?</h4>
                    <p className="section-desc">
                        При отсутствии каких-либо документов перечисленных в списке,
                        свяжитесь с нами, для уточнения возможности сделки.
                    </p>
                    {what.map(item => {
                        return (
                            <div key={item} className={styles.pointItem}>
                                <div className={styles.pointIcon} />
                                <p className={styles.pointText}>
                                    {item}
                                </p>
                            </div>
                        )
                    })}
                </div>
                </div>
            </div>
        </div>
    )
}

export default RatingAuto
