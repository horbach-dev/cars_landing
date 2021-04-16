import React, { useEffect, useRef } from 'react'

const Move = () => {
  const parallaxRef = useRef(null)

  const isMobileVersion = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i)

  const motionSupport = !!window.DeviceMotionEvent && !isMobileVersion

  const handleMotion = e => {
    const beta = e.accelerationIncludingGravity.x
    const gamma = e.accelerationIncludingGravity.y
    const list = parallaxRef.current.childNodes

    list.forEach(el => {
      const translateX = -beta * 10 * el.dataset.depth
      const translateY = gamma * 10 * el.dataset.depth
      el.style.transform = `translate(${translateX}px, ${translateY}px)`
    })
  }

  const handleMove = e => {
    const posX = (window.innerWidth / 2) - e.clientX
    const posY = (window.innerHeight / 2) - e.clientY
    const list = parallaxRef.current.childNodes

    list.forEach(el => {
      const translateX = -posX / (15 * el.dataset.depth)
      const translateY = -posY / (15 * el.dataset.depth)
      el.style.transform = `translate(${translateX}px, ${translateY}px)`
    })
  }

  useEffect(() => {
    motionSupport && window.addEventListener('devicemotion', handleMotion, true)
    isMobileVersion && window.addEventListener('mousemove', handleMove)

    return () => {
      window.removeEventListener('devicemotion', handleMotion)
      window.removeEventListener('mousemove', handleMove)
    }
  }, [])

  return (
    <div className='land20'>
    <div ref={parallaxRef} className='land20__parallax'>
      <div className='land20__parallax-scene' data-depth='1.0'><div /></div>
      <div className='land20__parallax-scene' data-depth='0.8'><div /></div>
      <div className='land20__parallax-scene' data-depth='0.6'><div /></div>
      <div className='land20__parallax-scene' data-depth='0.4'><div /></div>
    </div>
      </div>
  )
}

export default Move
