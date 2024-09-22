import React from 'react'
import { motion } from 'framer-motion'
import image1 from '../../../assets/d-l-samuels-V4jU3RXr-Ag-unsplash.jpg?height=100&width=100'
import image2 from '../../../assets/mudit-jain-PqLnmBcSILs-unsplash.jpg?height=120&width=120'
import image3 from '../../../assets/tony-litvyak-IlZsnrbrA20-unsplash.jpg?height=80&width=80'
import image4 from '../../../assets/mudit-jain-PqLnmBcSILs-unsplash.jpg?height=90&width=90'
import image5 from '../../../assets/tony-litvyak-IlZsnrbrA20-unsplash.jpg?height=110&width=110'


const FloatingImages = () => {

    const images = [image1, image2, image3, image4, image5]



  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {images.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          className="absolute rounded-full shadow-lg"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default FloatingImages