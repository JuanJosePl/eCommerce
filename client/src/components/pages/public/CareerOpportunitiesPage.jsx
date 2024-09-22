import React from "react";
import { Search, MapPin, Briefcase, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const jobListings = [
  {
    id: 1,
    title: "Desarrollador Full Stack",
    department: "Tecnología",
    location: "Remoto",
    type: "Tiempo completo",
    description:
      "Estamos buscando un desarrollador Full Stack con experiencia en React y Node.js para unirse a nuestro equipo de desarrollo de productos.",
  },
  {
    id: 2,
    title: "Especialista en Marketing Digital",
    department: "Marketing",
    location: "Madrid, España",
    type: "Tiempo completo",
    description:
      "Buscamos un especialista en marketing digital para liderar nuestras campañas en línea y estrategias de crecimiento.",
  },
  {
    id: 3,
    title: "Diseñador UX/UI",
    department: "Diseño",
    location: "Barcelona, España",
    type: "Tiempo completo",
    description:
      "Únete a nuestro equipo de diseño para crear experiencias de usuario excepcionales para nuestra plataforma de ecommerce.",
  },
  {
    id: 4,
    title: "Analista de Datos",
    department: "Análisis",
    location: "Remoto",
    type: "Medio tiempo",
    description:
      "Buscamos un analista de datos para ayudarnos a tomar decisiones basadas en datos y mejorar nuestras estrategias de negocio.",
  },
];

const JobCard = ({ job }) => (
  <Card>
    <CardHeader>
      <CardTitle>{job.title}</CardTitle>
      <CardDescription>
        {job.department} · {job.location}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {job.description}
      </p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Briefcase className="mr-2 h-4 w-4" />
        {job.type}
      </div>
      <Button variant="outline">Ver detalles</Button>
    </CardFooter>
  </Card>
);

export default function CareerOpportunitiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Oportunidades de Carrera</h1>

      <div className="mb-8">
        <p className="text-lg mb-4">
          En [Nombre de la Empresa], estamos siempre buscando talentos
          apasionados para unirse a nuestro equipo en crecimiento. Explora
          nuestras oportunidades actuales y sé parte de nuestra misión de
          revolucionar el comercio electrónico.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <div>
          <Input type="text" placeholder="Buscar trabajos..." />
        </div>
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los departamentos</SelectItem>
              <SelectItem value="technology">Tecnología</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="design">Diseño</SelectItem>
              <SelectItem value="analysis">Análisis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Ubicación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las ubicaciones</SelectItem>
              <SelectItem value="remote">Remoto</SelectItem>
              <SelectItem value="madrid">Madrid</SelectItem>
              <SelectItem value="barcelona">Barcelona</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {jobListings.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          ¿No ves el trabajo que buscas?
        </h2>
        <p className="mb-4">
          Siempre estamos interesados en conocer a profesionales talentosos.
          Envíanos tu CV y nos pondremos en contacto contigo si surge una
          oportunidad que se ajuste a tu perfil.
        </p>
        <Button>Enviar CV</Button>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          Por qué trabajar con nosotros
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <ChevronRight className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
            <span>Oportunidades de crecimiento y desarrollo profesional</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
            <span>Cultura de trabajo colaborativa e innovadora</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
            <span>
              Beneficios competitivos y equilibrio entre trabajo y vida personal
            </span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
            <span>
              Oportunidad de trabajar en proyectos desafiantes e impactantes
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

