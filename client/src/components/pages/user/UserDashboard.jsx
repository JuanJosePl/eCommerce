import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Heart,
  Gift,
  TrendingUp,
  Package,
  Settings,
} from "lucide-react";
import { getAuthStatus } from "@/helper/auth";
import { API_URL } from "@/constants/env";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { isAuthenticated, user } = await getAuthStatus();
      if (isAuthenticated && user) {
        setUser(user);
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, [navigate]);

  const currentTime = new Date();
  const hours = currentTime.getHours();

  let greeting;
  if (hours < 12) {
    greeting = "Buenos días";
  } else if (hours < 18) {
    greeting = "Buenas tardes";
  } else {
    greeting = "Buenas noches";
  }

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            {greeting}, {user.nombre}
          </h1>
          <p className="text-muted-foreground mt-1">
            Bienvenido de vuelta a tu panel personal
          </p>
        </div>
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={user.avatar ? `${API_URL}${user.avatar}` : undefined}
            alt={user.nombre}
          />
          <AvatarFallback>{user.nombre ? user.nombre.charAt(0) : 'U'}</AvatarFallback>
        </Avatar>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pedidos Totales
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 desde el último mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lista de Deseos
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 productos</div>
            <p className="text-xs text-muted-foreground">
              Añade más para no perderlos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Puntos de Fidelidad
            </CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250 pts</div>
            <p className="text-xs text-muted-foreground">
              250 pts más para el siguiente nivel
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nivel de Cliente
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Plata</div>
            <Progress value={progress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">66% hacia Oro</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Últimos Pedidos</CardTitle>
            <CardDescription>Resumen de tus compras recientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "001",
                  name: "Smartphone XYZ",
                  status: "Entregado",
                  date: "2023-07-01",
                },
                {
                  id: "002",
                  name: "Laptop ABC",
                  status: "En camino",
                  date: "2023-07-15",
                },
                {
                  id: "003",
                  name: "Auriculares Inalámbricos",
                  status: "Procesando",
                  date: "2023-07-20",
                },
              ].map((order) => (
                <div key={order.id} className="flex items-center">
                  <Package className="h-9 w-9 text-primary" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {order.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Pedido #{order.id}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge
                      variant={
                        order.status === "Entregado" ? "default" : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/pedidos")}
            >
              Ver todos los pedidos
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Accede rápidamente a las funciones más utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              onClick={() => navigate("/perfil")}
              className="w-full justify-start"
            >
              <Settings className="mr-2 h-4 w-4" /> Editar Perfil
            </Button>
            <Button
              onClick={() => navigate("/lista-deseos")}
              className="w-full justify-start"
            >
              <Heart className="mr-2 h-4 w-4" /> Ver Lista de Deseos
            </Button>
            <Button
              onClick={() => navigate("/programa-fidelidad")}
              className="w-full justify-start"
            >
              <Gift className="mr-2 h-4 w-4" /> Programa de Fidelidad
            </Button>
            <Button
              onClick={() => navigate("/configuracion")}
              className="w-full justify-start"
            >
              <Settings className="mr-2 h-4 w-4" /> Configuración de la Cuenta
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
