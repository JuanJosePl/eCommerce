import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'

const ProductShowcase = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setRotate({ x: (y - 0.5) * 20, y: (x - 0.5) * -20 })
  }

  return (
    <motion.div
      className="relative w-64 h-64 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-xl"
      style={{ perspective: 1000 }}
      whileHover={{ scale: 1.05 }}
      onMouseMove={handleMouseMove}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
    >
      <motion.img
        src="../../../assets/mudit-jain-PqLnmBcSILs-unsplash.jpg?height=200&width=200"
        alt="Product"
        className="absolute inset-0 w-full h-full object-cover rounded-lg"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ z: 50 }}
      />
      <motion.div
        className="absolute inset-0 bg-background/30 flex items-center justify-center rounded-lg"
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ShoppingBag className="text-primary text-4xl" />
      </motion.div>
    </motion.div>
  )
}

export default ProductShowcase