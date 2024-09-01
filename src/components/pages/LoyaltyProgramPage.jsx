import React from "react";
import { Gift, Award, TrendingUp, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const tiers = [
  {
    name: "Bronce",
    points: 0,
    benefits: [
      "5% de descuento en todas las compras",
      "Envío gratis en pedidos superiores a $50",
    ],
  },
  {
    name: "Plata",
    points: 1000,
    benefits: [
      "10% de descuento en todas las compras",
      "Envío gratis en todos los pedidos",
      "Acceso anticipado a nuevos productos",
    ],
  },
  {
    name: "Oro",
    points: 5000,
    benefits: [
      "15% de descuento en todas las compras",
      "Envío gratis y prioritario",
      "Servicio al cliente VIP",
      "Regalos exclusivos",
    ],
  },
];

const LoyaltyTierCard = ({ tier, isCurrentTier }) => (
  <Card className={isCurrentTier ? "border-blue-500 border-2" : ""}>
    <CardHeader>
      <CardTitle>{tier.name}</CardTitle>
      <CardDescription>{tier.points} puntos</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="list-disc list-inside space-y-2">
        {tier.benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      {isCurrentTier ? (
        <span className="text-blue-500 font-semibold">Tu nivel actual</span>
      ) : (
        <Button variant="outline">Más información</Button>
      )}
    </CardFooter>
  </Card>
);

export default function LoyaltyProgramPage() {
  const currentPoints = 1500;
  const currentTier = tiers.find((tier) => currentPoints >= tier.points);
  const nextTier = tiers.find((tier) => currentPoints < tier.points);
  const progressToNextTier = nextTier
    ? (currentPoints / nextTier.points) * 100
    : 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Programa de Fidelidad</h1>

      <div className="bg-gray-100 p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">Tu Estado de Fidelidad</h2>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg">
            Nivel Actual: <strong>{currentTier.name}</strong>
          </span>
          <span className="text-lg">
            Puntos: <strong>{currentPoints}</strong>
          </span>
        </div>
        {nextTier && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{currentTier.name}</span>
              <span>{nextTier.name}</span>
            </div>
            <Progress value={progressToNextTier} className="mb-2" />
            <p className="text-sm text-gray-600">
              Te faltan {nextTier.points - currentPoints} puntos para alcanzar
              el siguiente nivel
            </p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="mr-2 h-5 w-5" /> Gana Puntos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gana 1 punto por cada $1 gastado en nuestra tienda.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5" /> Sube de Nivel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Alcanza nuevos niveles y desbloquea más beneficios.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" /> Acumula Recompensas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Usa tus puntos para obtener descuentos y productos gratis.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" /> Beneficios Exclusivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Disfruta de ofertas especiales y acceso anticipado a ventas.</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Niveles de Fidelidad</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier, index) => (
          <LoyaltyTierCard
            key={index}
            tier={tier}
            isCurrentTier={tier.name === currentTier.name}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button size="lg">Ver Historial de Puntos</Button>
      </div>
    </div>
  );
}
