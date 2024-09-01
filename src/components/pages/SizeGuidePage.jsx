import React from "react";
import { Ruler, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const sizeCharts = {
  tops: [
    { size: "XS", chest: "32-34", waist: "26-28", hips: "34-36" },
    { size: "S", chest: "35-37", waist: "29-31", hips: "37-39" },
    { size: "M", chest: "38-40", waist: "32-34", hips: "40-42" },
    { size: "L", chest: "41-43", waist: "35-37", hips: "43-45" },
    { size: "XL", chest: "44-46", waist: "38-40", hips: "46-48" },
  ],
  bottoms: [
    { size: "XS", waist: "26-28", hips: "34-36", inseam: "30" },
    { size: "S", waist: "29-31", hips: "37-39", inseam: "30.5" },
    { size: "M", waist: "32-34", hips: "40-42", inseam: "31" },
    { size: "L", waist: "35-37", hips: "43-45", inseam: "31.5" },
    { size: "XL", waist: "38-40", hips: "46-48", inseam: "32" },
  ],
};

const SizeChart = ({ data, title }) => (
  <Table>
    <TableCaption>{title}</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Talla</TableHead>
        {Object.keys(data[0])
          .filter((key) => key !== "size")
          .map((key) => (
            <TableHead key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)} (pulgadas)
            </TableHead>
          ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((row, index) => (
        <TableRow key={index}>
          <TableCell className="font-medium">{row.size}</TableCell>
          {Object.entries(row)
            .filter(([key]) => key !== "size")
            .map(([key, value]) => (
              <TableCell key={key}>{value}</TableCell>
            ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default function SizeGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Guía de Tallas</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cómo Medir</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <Ruler className="mr-2 h-5 w-5 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Pecho</h3>
              <p>
                Mide alrededor de la parte más completa de tu pecho, manteniendo
                la cinta métrica horizontal.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Ruler className="mr-2 h-5 w-5 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Cintura</h3>
              <p>
                Mide alrededor de tu cintura natural, generalmente justo encima
                del ombligo.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Ruler className="mr-2 h-5 w-5 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Caderas</h3>
              <p>Mide alrededor de la parte más ancha de tus caderas.</p>
            </div>
          </div>
          <div className="flex items-start">
            <Ruler className="mr-2 h-5 w-5 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Tiro</h3>
              <p>
                Mide desde la entrepierna hasta la parte inferior del tobillo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tablas de Tallas</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="tops">
            <AccordionTrigger>Tops y Camisetas</AccordionTrigger>
            <AccordionContent>
              <SizeChart
                data={sizeCharts.tops}
                title="Guía de tallas para tops y camisetas"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="bottoms">
            <AccordionTrigger>Pantalones y Faldas</AccordionTrigger>
            <AccordionContent>
              <SizeChart
                data={sizeCharts.bottoms}
                title="Guía de tallas para pantalones y faldas"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Consejo de Ajuste
            </h3>
            <p className="mt-2 text-sm text-blue-700">
              Si estás entre dos tallas, te recomendamos elegir la talla más
              grande para un ajuste más cómodo.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-lg mb-4">
          ¿Necesitas ayuda adicional con las tallas?
        </p>
        <Button size="lg">Contacta con Atención al Cliente</Button>
      </div>
    </div>
  );
}
