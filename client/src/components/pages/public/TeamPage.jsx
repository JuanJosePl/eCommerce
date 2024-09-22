import React from "react";
import { Mail, Linkedin, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";

const TeamMember = ({ name, role, image, bio, email, linkedin, twitter }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <img src={image} alt={name} className="w-full h-64 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{role}</p>
      <p className="text-gray-700 mb-4">{bio}</p>
      <div className="flex space-x-2">
        <Button variant="outline" size="icon">
          <Mail className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Twitter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Ana García",
      role: "CEO y Fundadora",
      image: "/placeholder.svg?height=400&width=300",
      bio: "Ana fundó la empresa en 2010 y ha liderado su crecimiento desde entonces.",
      email: "ana@example.com",
      linkedin: "https://linkedin.com/in/ana-garcia",
      twitter: "https://twitter.com/ana_garcia",
    },
    {
      name: "Carlos Rodríguez",
      role: "Director de Tecnología",
      image: "/placeholder.svg?height=400&width=300",
      bio: "Carlos supervisa todas las operaciones tecnológicas y de desarrollo.",
      email: "carlos@example.com",
      linkedin: "https://linkedin.com/in/carlos-rodriguez",
      twitter: "https://twitter.com/carlos_rodriguez",
    },
    {
      name: "Laura Martínez",
      role: "Directora de Marketing",
      image: "/placeholder.svg?height=400&width=300",
      bio: "Laura dirige nuestras estrategias de marketing y comunicación.",
      email: "laura@example.com",
      linkedin: "https://linkedin.com/in/laura-martinez",
      twitter: "https://twitter.com/laura_martinez",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-4xl font-bold mb-8">Nuestro Equipo</h1>

      <p className="text-lg mb-8">
        Nuestro equipo está formado por profesionales apasionados y dedicados
        que trabajan incansablemente para ofrecer la mejor experiencia de compra
        a nuestros clientes.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          ¿Quieres unirte a nuestro equipo?
        </h2>
        <p className="text-lg mb-6">
          Estamos siempre buscando talento para unirse a nuestra creciente
          familia.
        </p>
        <Button size="lg">Ver Oportunidades de Carrera</Button>
      </div>
    </div>
  );
}
