import React from "react";
import { Leaf, Recycle, Heart, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const initiatives = [
  {
    title: "Materiales Sostenibles",
    description:
      "Utilizamos materiales reciclados y de origen sostenible en nuestros productos.",
    icon: <Leaf className="h-6 w-6" />,
  },
  {
    title: "Embalaje Ecológico",
    description:
      "Nuestros embalajes son 100% reciclables y libres de plástico.",
    icon: <Recycle className="h-6 w-6" />,
  },
  {
    title: "Comercio Justo",
    description:
      "Trabajamos con proveedores que garantizan condiciones laborales justas.",
    icon: <Heart className="h-6 w-6" />,
  },
  {
    title: "Huella de Carbono",
    description:
      "Nos comprometemos a reducir nuestra huella de carbono año tras año.",
    icon: <Globe className="h-6 w-6" />,
  },
];

export default function SustainabilityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Sostenibilidad y Responsabilidad Social
      </h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Nuestro Compromiso</h2>
        <p className="text-lg mb-4">
          En OasisShop, creemos que el comercio puede ser una fuerza
          para el bien. Nos esforzamos por crear productos de alta calidad
          mientras minimizamos nuestro impacto ambiental y promovemos prácticas
          comerciales éticas.
        </p>
        <p className="text-lg">
          Nuestro compromiso con la sostenibilidad y la responsabilidad social
          es fundamental en todo lo que hacemos, desde el diseño de nuestros
          productos hasta nuestras operaciones diarias.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {initiatives.map((initiative, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                {initiative.icon}
                <span className="ml-2">{initiative.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{initiative.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Nuestros Objetivos de Sostenibilidad
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Reducir nuestras emisiones de CO2 en un 50% para 2025</li>
          <li>
            Utilizar 100% energía renovable en nuestras operaciones para 2023
          </li>
          <li>
            Eliminar completamente los plásticos de un solo uso en nuestros
            embalajes para 2022
          </li>
          <li>
            Asegurar que el 80% de nuestros materiales provengan de fuentes
            sostenibles para 2024
          </li>
        </ul>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-12">
        <div className="flex">
          <div className="flex-shrink-0">
            <Leaf className="h-5 w-5 text-green-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Certificaciones
            </h3>
            <p className="mt-2 text-sm text-green-700">
              Estamos orgullosos de contar con certificaciones de sostenibilidad
              reconocidas internacionalmente, incluyendo B Corp, Fair Trade, y
              GOTS (Global Organic Textile Standard).
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Únete a Nuestro Esfuerzo
        </h2>
        <p className="text-lg mb-6">
          Creemos que cada pequeña acción cuenta. Al comprar nuestros productos,
          estás apoyando prácticas comerciales sostenibles y éticas.
        </p>
        <Button size="lg">Explora Nuestros Productos Sostenibles</Button>
      </div>
    </div>
  );
}
