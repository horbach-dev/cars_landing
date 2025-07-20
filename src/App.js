import React, { useEffect, useState } from 'react'
import Modal from "./components/Modal";
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import FeaturesSection from "./components/FeaturesSection";
import StepsSection from "./components/StepsSection";
import RatingAuto from "./components/RatingAuto";
import PurchasedCars from "./components/PurchasedCars";
import CarLogosSection from "./components/CarLogosSection";
import Footer from "./components/Footer";

import './App.scss';

const App = () => {
  const [mark, setMark] = useState('')
  const [complete, setComplete] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);

  const mouseOut = () => {
    const dateShow = localStorage.getItem("modalShowed")
    const now = Date.now()
    const expired = now + 360000

    if (!dateShow || Number(dateShow) < now) {
      localStorage.setItem("modalShowed", String(expired))
      setModalVisible(true)
    }
  }

  useEffect(() => {
    window.document.addEventListener('mouseleave', mouseOut);
  }, [])

  const handleOpenModel = () => {
    setModalVisible(true);
  }

  const handleCancel = () => {
    setModalVisible(false);
  }

  const handleComplete = () => setComplete(true)

  return (
    <div className="App">
      <Modal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
      />
      <Header handleOpenModel={handleOpenModel}/>
      <MainSection complete={complete} handleComplete={handleComplete}/>
      <FeaturesSection handleOpenModel={handleOpenModel}/>
      <StepsSection/>
      <RatingAuto complete={complete} handleComplete={handleComplete} mark={mark}/>
      <PurchasedCars handleOpenModel={handleOpenModel}/>
      <CarLogosSection handleClickMark={setMark}/>
      <Footer/>
    </div>
  )
}

export default App
