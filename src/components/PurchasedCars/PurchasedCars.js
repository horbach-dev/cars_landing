import React, {useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
// import SwiperCore, { Navigation } from 'swiper';
import styles from './PurchasedCars.module.css'
import {Button} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

// SwiperCore.use([Navigation]);

const PurchasedCars = ({handleOpenModel}) => {
  const [swiper, setSwiper] = useState(null)

  const initSwiper = (swiper) => setSwiper(swiper)

  const handlePrevSlide = () => {
    swiper.slidePrev()
  }

  const handleNextSlide = () => {
    swiper.slideNext()
  }

  const items = [
    {
      id: '0',
      img: '/images/purchased-cars/t5-caravelle.png',
      title: 'T5 caravelle',
      price: '$9000',
      city: 'на ходу'
    },
    {
      id: '1',
      img: '/images/purchased-cars/honda-pilot.png',
      title: 'Honda Pilot',
      price: '$4500',
      city: 'существенные недочеты'
    },
    {
      id: '2',
      img: '/images/purchased-cars/subaru-forester.png',
      title: 'Subaru Forester',
      price: '$1900',
      city: 'существенные недочеты'
    },
    {
      id: '3',
      img: '/images/purchased-cars/infinity.png',
      title: 'Infinity',
      price: '$10000',
      city: 'на ходу'
    },
    {
      id: '4',
      img: '/images/purchased-cars/grand-espace.png',
      title: 'Grand espace',
      price: '$2500',
      city: 'существенные недочеты'
    },
  ]

  return (
    <div className={styles.PurchasedCars}>
      <div className="container">
        <h3 className="section-title">Последние выкупленные нами авто</h3>
      </div>
      <Swiper
        loop
        // navigation
        breakpoints={
          {
            640: {
              slidesPerView: 2,
            },
            1140: {
              slidesPerView: 3,
            },
            1820: {
              slidesPerView: 4,
            }
          }
        }
        onSwiper={initSwiper}
        className={`${styles.purchasedSlider} home-slider`}
      >
        {items.map(item => {
          return (
            <SwiperSlide key={item.id} className={styles.purchasedSliderItem}>
              <div className={styles.purchasedSliderItemWrap}>
                <figure><img src={item.img} alt={item.title}/></figure>
                <p className={styles.purchasedItemTitle}>{item.title}</p>
                <div className={styles.purchasedItemBottom}>
                  <div className={styles.purchasedItemPrice}>{item.price}</div>
                  <div className={styles.purchasedItemCity}>{item.city}</div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
        <div className={styles.actionButtons}>
          <Button
            type="primary"
            className={styles.actionBtn}
            shape="circle"
            onClick={handlePrevSlide}
            icon={<LeftOutlined/>}
          />
          <Button
            type="primary"
            className={styles.actionBtn}
            shape="circle"
            onClick={handleNextSlide}
            icon={<RightOutlined/>}
          />
        </div>
      </Swiper>
      <div className={styles.callWrapper}>
        <Button className={styles.callBtn} type="primary" onClick={handleOpenModel}>
          Предложить свой авто
        </Button>
      </div>
    </div>
  )
}

export default PurchasedCars;
