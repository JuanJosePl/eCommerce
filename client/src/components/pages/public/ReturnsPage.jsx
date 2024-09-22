import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ReturnsPage() {
  const returnSteps = [
    "Inicia sesión en tu cuenta y ve a 'Mis Pedidos'",
    "Selecciona el pedido que contiene el artículo que deseas devolver",
    "Elige el artículo y la razón de la devolución",
    "Imprime la etiqueta de devolución proporcionada",
    "Empaca el artículo en su embalaje original",
    "Pega la etiqueta de devolución en el paquete",
    "Deja el paquete en el punto de recogida más cercano",
  ];

  const returnFAQs = [
    {
      question: "¿Cuánto tiempo tengo para devolver un artículo?",
      answer:
        "Tienes 30 días desde la fecha de recepción para iniciar una devolución.",
    },
    {
      question: "¿Cuánto tiempo tarda en procesarse mi reembolso?",
      answer:
        "Una vez que recibamos tu devolución, el reembolso se procesará en 3-5 días hábiles.",
    },
    {
      question: "¿Puedo cambiar un artículo por otro tamaño o color?",
      answer:
        "Sí, puedes solicitar un cambio por otro tamaño o color, sujeto a disponibilidad.",
    },
    {
      question: "¿Qué pasa si recibí un artículo defectuoso?",
      answer:
        "Si recibes un artículo defectuoso, contáctanos inmediatamente y te enviaremos un reemplazo sin costo adicional.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Política de Devoluciones</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Nuestra Garantía</h2>
        <p className="text-lg mb-4">
          En OasisShop, nos esforzamos por garantizar tu
          satisfacción. Si no estás completamente satisfecho con tu compra,
          puedes devolverla dentro de los 30 días posteriores a la recepción
          para un reembolso completo o un cambio.
        </p>
        <div className="flex items-center text-green-600">
          <CheckCircle className="mr-2 h-5 w-5" />
          <span>Devoluciones gratuitas en todos los pedidos</span>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Cómo Realizar una Devolución
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          {returnSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Preguntas Frecuentes sobre Devoluciones
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {returnFAQs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Nota: Algunos artículos, como productos personalizados o artículos
              de higiene personal, pueden no ser elegibles para devolución.
              Consulta nuestra política completa para más detalles.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg mb-4">
          ¿Tienes más preguntas sobre devoluciones?
        </p>
        <Button asChild>
          <a href="/contacto">Contáctanos</a>
        </Button>
      </div>
    </div>
  );
}
