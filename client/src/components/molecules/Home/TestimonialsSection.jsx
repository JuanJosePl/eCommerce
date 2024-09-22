import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "María G.",
      text: "Excelente servicio y productos de alta calidad. ¡Totalmente recomendado!",
    },
    {
      name: "Carlos R.",
      text: "La entrega fue rápida y el producto superó mis expectativas. Volveré a comprar.",
    },
    {
      name: "Laura M.",
      text: "Increíble variedad de productos y precios competitivos. Mi tienda favorita.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <motion.h2
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Lo que dicen nuestros clientes
        </motion.h2>
        <div className="relative h-64">
          <AnimatePresence>
            {testimonials.map(
              (testimonial, index) =>
                index === currentTestimonial && (
                  <motion.div
                    key={index}
                    className="absolute w-full"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <blockquote className="text-center bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
                      <p className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
                        "{testimonial.text}"
                      </p>
                      <footer className="text-gray-600 dark:text-gray-400">
                        <strong>{testimonial.name}</strong>
                        <div className="flex justify-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </footer>
                    </blockquote>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
