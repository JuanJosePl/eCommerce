import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    {
      question: "¿Cuál es el tiempo de entrega estándar?",
      answer:
        "Nuestro tiempo de entrega estándar es de 3 a 5 días hábiles para envíos nacionales. Para envíos internacionales, el tiempo puede variar entre 7 y 14 días hábiles.",
    },
    {
      question: "¿Cómo puedo rastrear mi pedido?",
      answer:
        "Una vez que tu pedido haya sido enviado, recibirás un correo electrónico con un número de seguimiento. Puedes usar este número en nuestra página de 'Rastrear Pedido' para ver el estado actual de tu envío.",
    },
    {
      question: "¿Cuál es su política de devoluciones?",
      answer:
        "Ofrecemos devoluciones gratuitas dentro de los 30 días posteriores a la recepción de tu pedido. El artículo debe estar sin usar y en su embalaje original. Consulta nuestra página de 'Política de Devoluciones' para más detalles.",
    },
    {
      question: "¿Ofrecen envío gratuito?",
      answer:
        "Sí, ofrecemos envío gratuito en pedidos superiores a $50 para envíos nacionales. Para pedidos internacionales, el envío gratuito se aplica en compras superiores a $100.",
    },
    {
      question: "¿Cómo puedo contactar al servicio al cliente?",
      answer:
        "Puedes contactarnos a través de nuestro formulario de contacto en línea, por correo electrónico a support@example.com, o llamando a nuestro número de atención al cliente al 1-800-123-4567 de lunes a viernes, de 9am a 5pm.",
    },
    {
      question: "¿Tienen una aplicación móvil?",
      answer:
        "Sí, tenemos una aplicación móvil disponible tanto para dispositivos iOS como Android. Puedes descargarla gratuitamente desde la App Store o Google Play Store.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Preguntas Frecuentes</h1>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 text-center">
        <p className="text-lg mb-4">
          ¿No encontraste la respuesta que buscabas?
        </p>
        <a href="/contacto" className="text-blue-600 hover:underline">
          Contáctanos para más ayuda
        </a>
      </div>
    </div>
  );
}
