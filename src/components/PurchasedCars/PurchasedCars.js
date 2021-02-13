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
      img: '/images/purchased-cars/peugeot.jpg',
      title: 'Peugeot 307',
      price: '$3500',
      city: 'на ходу'
    },
    {
      id: '1',
      img: '/images/purchased-cars/mercedes_bit.jpg',
      title: 'Mercedes-Benz W211',
      price: '$6000',
      city: 'битая'
    },
    {
      id: '2',
      img: '/images/purchased-cars/range-rover.jpg',
      title: 'Range Rover sport, 2007',
      price: '$6500',
      city: 'пневмо неисправно'
    },
    {
      id: '3',
      img: '/images/purchased-cars/audi-tt.jpg',
      title: 'Audi TT 1.8, 1999',
      price: '$3000',
      city: 'на ходу'
    },
    {
      id: '4',
      img: '/images/purchased-cars/bmw-525.jpg',
      title: 'BMW 525, 2002',
      price: '$1100',
      city: 'неисправен двигатель'
    },
    {
      id: '5',
      img: '/images/purchased-cars/bmw-34.jpg',
      title: 'BMW 320, 1999',
      price: '$1300',
      city: 'дефекты кузова'
    },
    {
      id: '6',
      img: '/images/purchased-cars/volkswagen-sharan.jpg',
      title: 'Volkswagen Sharan, 1.9D',
      price: '$3500',
      city: 'дефекты кузова'
    },
    {
      id: '7',
      img: '/images/purchased-cars/audi-a3.jpg',
      title: 'Audi A3 3.2',
      price: '$2850',
      city: 'после ДТП'
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
