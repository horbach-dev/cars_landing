import React from "react";
import styles from './CarLogosSection.module.css'

const logos = [
  'bmw',
  'mercedes-benz',
  'audi',
  'volkswagen',
  'nissan',
  'renault',
  'honda',
  'hyundai',
  'mazda',
  'toyota',
  'infiniti',
  'peugeot',
  'ford',
  'mitsubishi',
  'kia',
  'porsche',
  'land-rover',
  'lexus',
  'opel',
  'alfa-romeo',
  'citroen',
  'volvo',
  'fiat',
  'suzuki',
]


const CarLogosSection = ({ handleClickMark }) => {

  const handleMark = (logo) => {
    const form = document.getElementById('rating-form')
    if (form && form.offsetTop) {
      window.scroll({ top: form.offsetTop - 90, behavior: 'smooth' })
      handleClickMark(logo)
    }
  }

  return (
    <div className={styles.CarLogosSection}>
      <div className="container">
        <h3 className="section-title">Выкупаем автомобили любой марки</h3>
        <div className={styles.LogosWrap}>
          {logos.map(logo => (
            <button
              key={logo}
              onClick={() => handleMark(logo)}
              className={styles.LogosWrapItem}
            >
              <img src={`images/car-logos/${logo}-logo.png`} alt={logo + ' logo'} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CarLogosSection
