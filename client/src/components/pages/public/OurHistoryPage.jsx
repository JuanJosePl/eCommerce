import React from "react";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function OurHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-4xl font-bold mb-8">Nuestra Historia</h1>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <p className="text-lg mb-4">
            Fundada en 2010, nuestra empresa comenzó como una pequeña tienda en
            línea con la visión de ofrecer productos únicos y de alta calidad a
            nuestros clientes.
          </p>
          <p className="text-lg mb-4">
            A lo largo de los años, hemos crecido hasta convertirnos en uno de
            los principales destinos de compras en línea, manteniendo siempre
            nuestro compromiso con la calidad y la satisfacción del cliente.
          </p>
          <p className="text-lg">
            Hoy, seguimos innovando y expandiendo nuestra oferta, siempre con el
            objetivo de superar las expectativas de nuestros clientes.
          </p>
        </div>
        <div className="relative h-64 md:h-full">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Nuestra tienda original"
            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Hitos Importantes</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <ChevronRight className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <strong>2010:</strong> Lanzamiento de nuestra tienda en línea
            </div>
          </li>
          <li className="flex items-start">
            <ChevronRight className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <strong>2015:</strong> Expansión a mercados internacionales
            </div>
          </li>
          <li className="flex items-start">
            <ChevronRight className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <strong>2018:</strong> Lanzamiento de nuestra aplicación móvil
            </div>
          </li>
          <li className="flex items-start">
            <ChevronRight className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <strong>2020:</strong> Celebración de nuestro 10º aniversario
            </div>
          </li>
        </ul>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          ¿Quieres ser parte de nuestra historia?
        </h2>
        <p className="text-lg mb-6">
          Únete a nosotros y ayúdanos a escribir los próximos capítulos de
          nuestra empresa.
        </p>
        <Button size="lg">Ver Oportunidades de Carrera</Button>
      </div>
    </div>
  );
}
