import React from "react";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const JobListing = ({ title, department, location, description }) => (
  <AccordionItem value={title}>
    <AccordionTrigger>{title}</AccordionTrigger>
    <AccordionContent>
      <p className="mb-2">
        <strong>Departamento:</strong> {department}
      </p>
      <p className="mb-2">
        <strong>Ubicación:</strong> {location}
      </p>
      <p className="mb-4">{description}</p>
      <Button>Aplicar Ahora</Button>
    </AccordionContent>
  </AccordionItem>
);

export default function CareersPage() {
  const jobListings = [
    {
      title: "Desarrollador Full Stack",
      department: "Tecnología",
      location: "Remoto",
      description:
        "Buscamos un desarrollador full stack con experiencia en React y Node.js para unirse a nuestro equipo de desarrollo.",
    },
    {
      title: "Especialista en Marketing Digital",
      department: "Marketing",
      location: "Madrid, España",
      description:
        "Estamos buscando un especialista en marketing digital para liderar nuestras campañas en línea y estrategias de crecimiento.",
    },
    {
      title: "Gerente de Atención al Cliente",
      department: "Servicio al Cliente",
      location: "Barcelona, España",
      description:
        "Buscamos un gerente de atención al cliente para supervisar nuestro equipo de soporte y mejorar la satisfacción del cliente.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <a href="/">Inicio</a>
          </li>
          <li>
            <a href="/sobre-nosotros">Sobre Nosotros</a>
          </li>
          <li>Carreras</li>
        </ul>
      </div>

      <h1 className="text-4xl font-bold mb-8">Carreras en Nuestra Empresa</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          ¿Por qué trabajar con nosotros?
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <ChevronRight className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>Ambiente de trabajo dinámico y colaborativo</div>
          </li>
          <li className="flex items-start">
            <ChevronRight className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>Oportunidades de crecimiento y desarrollo profesional</div>
          </li>
          <li className="flex items-start">
            <ChevronRight className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              Beneficios competitivos y equilibrio entre trabajo y vida personal
            </div>
          </li>
          <li className="flex items-start">
            <ChevronRight className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              Posibilidad de trabajar en proyectos innovadores y desafiantes
            </div>
          </li>
        </ul>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Posiciones Abiertas</h2>
        <Accordion type="single" collapsible className="w-full">
          {jobListings.map((job, index) => (
            <JobListing key={index} {...job} />
          ))}
        </Accordion>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          ¿No ves la posición que buscas?
        </h2>
        <p className="text-lg mb-6">
          Siempre estamos interesados en conocer a profesionales talentosos.
          Envíanos tu CV y nos pondremos en contacto contigo si surge una
          oportunidad adecuada.
        </p>
        <Button size="lg">Enviar CV</Button>
      </div>
    </div>
  );
}
