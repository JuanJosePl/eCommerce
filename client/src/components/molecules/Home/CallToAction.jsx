import React from "react";
import { Button } from "@/components/ui/button";

const CallToAction = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Únete a nuestra comunidad de compradores
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Regístrate ahora y obtén un 10% de descuento en tu primera compra.
            Además, recibirás ofertas exclusivas y novedades directamente en tu
            correo.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <form className="flex space-x-2">
            <input
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ingresa tu email"
              type="email"
            />
            <Button type="submit">Suscribirse</Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Al suscribirte, aceptas nuestros términos y condiciones.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default CallToAction;
