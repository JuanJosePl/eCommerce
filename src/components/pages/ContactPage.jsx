import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contáctanos</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Envíanos un mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Tu nombre" required />
            </div>
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="subject">Asunto</Label>
              <Input id="subject" placeholder="Asunto de tu mensaje" required />
            </div>
            <div>
              <Label htmlFor="message">Mensaje</Label>
              <Textarea id="message" placeholder="Tu mensaje" required />
            </div>
            <Button type="submit">Enviar Mensaje</Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Información de Contacto
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              <span>support@example.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              <span>123 Ecommerce St, Ciudad, País</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Horario de Atención</h3>
            <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
            <p>Sábados: 10:00 AM - 2:00 PM</p>
            <p>Domingos: Cerrado</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Facebook
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                Twitter
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
