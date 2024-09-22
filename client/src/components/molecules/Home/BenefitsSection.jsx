import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Truck, RefreshCcw, ShieldCheck } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const BenefitsSection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Productos de Tendencia",
      description: "Siempre a la vanguardia de la moda y la tecnología.",
    },
    {
      icon: Truck,
      title: "Envío Rápido",
      description: "Entrega en 24-48 horas a todo el país.",
    },
    {
      icon: RefreshCcw,
      title: "Devoluciones Fáciles",
      description: "30 días para devoluciones sin complicaciones.",
    },
    {
      icon: ShieldCheck,
      title: "Compra Segura",
      description: "Transacciones encriptadas y protección al comprador.",
    },
  ];

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
          Por qué elegirnos
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
              variants={fadeInUp}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            >
              <benefit.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
