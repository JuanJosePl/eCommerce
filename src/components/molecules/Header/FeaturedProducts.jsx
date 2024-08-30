import React from "react";
import { Button } from "@/components/ui/button";

const FeaturedProducts = () => (
  <section className="py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        Productos Destacados
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((product) => (
          <div key={product} className="group relative overflow-hidden rounded-lg border">
            <img
              alt="Product"
              className="object-cover w-full h-64"
              height="400"
              src={`/placeholder.svg?height=400&width=400`}
              width="400"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 transition-all group-hover:translate-y-0">
              <div>
                <h3 className="font-semibold text-white">Producto {product}</h3>
                <p className="text-sm text-white/80">
                  Descripción breve del producto
                </p>
                <Button className="mt-4" variant="secondary">
                  Ver detalles
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
