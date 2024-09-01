import React from "react";
import FeaturedProducts from "../molecules/Header/FeaturedProducts";
import CallToAction from "../molecules/Header/CallToAction";
import { Button } from '@/components/ui/button'; 
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Bienvenido a Tu Ecommerce
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Descubre una amplia gama de productos de alta calidad. Desde
                    moda hasta tecnología, tenemos todo lo que necesitas.
                  </p>
                </div>
                <div className="space-x-4">
                  <Link to="/productos">
                    <Button>Ver Productos</Button>
                  </Link>
                  <Link to="/sobre-nosotros">
                    <Button variant="outline">Sobre Nosotros</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <FeaturedProducts />
          <CallToAction />
        </main>
      </div>
    </>
  );
}

export default Home;
