import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FeaturedProducts = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-gray-900 dark:text-white">
          Productos Destacados
        </h2>
        <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((product) => (
              <CarouselItem key={product}>
                <Card className="bg-white dark:bg-gray-800">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="text-center">
                      <img
                        src={`/placeholder.svg?height=200&width=200&text=Producto+${product}`}
                        alt={`Producto ${product}`}
                        className="mx-auto mb-4 rounded-lg"
                        width={200}
                        height={200}
                      />
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Producto {product}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Descripción breve del producto</p>
                      <Badge className="mt-2" variant="secondary">Nuevo</Badge>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-gray-900 dark:text-gray-100" />
          <CarouselNext className="text-gray-900 dark:text-gray-100" />
        </Carousel>
      </div>
    </section>
  );
}

export default FeaturedProducts;
