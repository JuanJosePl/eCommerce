import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "¿Cuál es el tiempo de entrega?",
      answer:
        "Nuestro tiempo de entrega estándar es de 3 a 5 días hábiles. Para entregas urgentes, ofrecemos opciones de envío express.",
    },
    {
      question: "¿Cómo puedo realizar un seguimiento de mi pedido?",
      answer:
        "Una vez que su pedido haya sido enviado, recibirá un correo electrónico con el número de seguimiento y un enlace para rastrear su envío.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer:
        "Aceptamos tarjetas de crédito, débito, transferencias bancarias y pagos a través de plataformas digitales como PayPal y Google Pay.",
    },
    {
      question: "¿Puedo devolver un producto?",
      answer:
        "Sí, ofrecemos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté en su estado original.",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-700">
      <div className="container px-4 md:px-6">
        <motion.h2
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Preguntas Frecuentes
        </motion.h2>
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
