import React from "react";
import { Link } from "react-router-dom";
import { Heart, Users, Leaf, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ValueCard = ({ icon, title, description }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

const TeamMember = ({ name, role, image }) => (
  <div className="text-center">
    <img
      src={image}
      alt={name}
      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
    />
    <h3 className="font-semibold text-lg">{name}</h3>
    <p className="text-gray-500">{role}</p>
  </div>
);

export default function SobreNosotrosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nosotros</h1>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Nuestra Historia
        </h2>
        <p className="text-lg mb-6 text-center max-w-3xl mx-auto">
          Fundada en 2010, OasisShop nació de la pasión por ofrecer
          productos únicos y de alta calidad a nuestros clientes. Lo que comenzó
          como una pequeña tienda en línea ha crecido hasta convertirse en un
          destino de compras líder, manteniendo siempre nuestro compromiso con
          la excelencia y la satisfacción del cliente.
        </p>
        <div className="flex justify-center">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Nuestra tienda original"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Nuestros Valores
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ValueCard
            icon={<Heart className="h-6 w-6 text-red-500" />}
            title="Pasión por la Calidad"
            description="Nos esforzamos por ofrecer solo los mejores productos a nuestros clientes."
          />
          <ValueCard
            icon={<Users className="h-6 w-6 text-blue-500" />}
            title="Enfoque en el Cliente"
            description="La satisfacción del cliente es nuestra prioridad número uno."
          />
          <ValueCard
            icon={<Leaf className="h-6 w-6 text-green-500" />}
            title="Sostenibilidad"
            description="Nos comprometemos a operar de manera responsable con el medio ambiente."
          />
          <ValueCard
            icon={<TrendingUp className="h-6 w-6 text-purple-500" />}
            title="Innovación Constante"
            description="Siempre buscamos nuevas formas de mejorar y crecer."
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Nuestro Equipo
        </h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          <TeamMember
            name="Ana García"
            role="CEO y Fundadora"
            image="/placeholder.svg?height=200&width=200"
          />
          <TeamMember
            name="Carlos Rodríguez"
            role="Director de Tecnología"
            image="/placeholder.svg?height=200&width=200"
          />
          <TeamMember
            name="Laura Martínez"
            role="Directora de Marketing"
            image="/placeholder.svg?height=200&width=200"
          />
          <TeamMember
            name="Miguel Sánchez"
            role="Director de Operaciones"
            image="/placeholder.svg?height=200&width=200"
          />
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-4">
          Únete a Nuestra Aventura
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Estamos siempre buscando talentos apasionados para unirse a nuestro
          equipo en crecimiento. Si te emociona la idea de trabajar en un
          ambiente dinámico y creativo, ¡queremos conocerte!
        </p>
        <Button asChild size="lg">
          <Link to="/sobre-nosotros/carreras">
            Ver Oportunidades de Carrera
          </Link>
        </Button>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-semibold mb-4">Nuestra Misión</h2>
        <p className="text-lg italic">
          "Inspirar y empoderar a nuestros clientes a través de productos
          excepcionales y experiencias de compra inolvidables, mientras
          construimos un futuro más sostenible para todos."
        </p>
      </div>
    </div>
  );
}
