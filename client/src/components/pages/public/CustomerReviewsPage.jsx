import React from "react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const reviews = [
  {
    id: 1,
    author: "María G.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "15/05/2023",
    title: "Excelente producto, superó mis expectativas",
    content:
      "Compré este producto hace un mes y estoy muy satisfecha. La calidad es excepcional y el servicio al cliente fue muy atento.",
    likes: 24,
    replies: 3,
  },
  {
    id: 2,
    author: "Carlos R.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "02/06/2023",
    title: "Buen producto, pero el envío tardó más de lo esperado",
    content:
      "El producto en sí es muy bueno, pero tuve que esperar más tiempo del indicado para recibirlo. Por lo demás, estoy contento con la compra.",
    likes: 10,
    replies: 1,
  },
  {
    id: 3,
    author: "Laura M.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "20/06/2023",
    title: "¡Increíble relación calidad-precio!",
    content:
      "No puedo creer lo mucho que obtuve por el precio que pagué. Definitivamente volveré a comprar en esta tienda.",
    likes: 35,
    replies: 5,
  },
];

const ReviewCard = ({ review }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="mr-2">
            <AvatarImage src={review.avatar} alt={review.author} />
            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{review.author}</CardTitle>
            <CardDescription>{review.date}</CardDescription>
          </div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < review.rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <h3 className="font-semibold mb-2">{review.title}</h3>
      <p>{review.content}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="ghost" size="sm">
        <ThumbsUp className="mr-2 h-4 w-4" />
        Útil ({review.likes})
      </Button>
      <Button variant="ghost" size="sm">
        <MessageSquare className="mr-2 h-4 w-4" />
        Responder ({review.replies})
      </Button>
    </CardFooter>
  </Card>
);

export default function CustomerReviewsPage() {
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Reseñas de Clientes</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Calificación General</h2>
          <div className="flex items-center mb-4">
            <span className="text-5xl font-bold mr-2">
              {averageRating.toFixed(1)}
            </span>
            <div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.round(averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Basado en {reviews.length} reseñas
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Distribución de Calificaciones
          </h2>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center mb-2">
              <span className="w-4 mr-2">{rating}</span>
              <Progress
                value={((ratingCounts[rating] || 0) / reviews.length) * 100}
                className="flex-grow mr-2"
              />
              <span className="w-8 text-right">
                {ratingCounts[rating] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button size="lg">Cargar Más Reseñas</Button>
      </div>
    </div>
  );
}
