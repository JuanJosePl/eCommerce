import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const HeroSection = ({ controls }) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0 opacity-10 dark:opacity-20"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
          backgroundSize: ['100% 100%', '120% 120%']
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          repeatType: 'reverse' 
        }}
        style={{
          backgroundImage: 'url("/pattern.svg")',
          backgroundRepeat: 'repeat'
        }}
      />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div className="space-y-2" {...fadeInUp}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 dark:text-white">
              Descubre el Futuro del E-commerce
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Explora una experiencia de compra única con productos innovadores y ofertas exclusivas.
            </p>
          </motion.div>
          <motion.div className="space-x-4" {...fadeInUp} transition={{ delay: 0.2 }}>
            <Link to="/productos">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
                Explorar Ahora
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/sobre-nosotros">
              <Button variant="outline" className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300">
                Conócenos
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        animate={controls}
      >
        <ChevronDown className="h-6 w-6 text-primary" />
      </motion.div>
    </section>
  )
}

export default HeroSection
