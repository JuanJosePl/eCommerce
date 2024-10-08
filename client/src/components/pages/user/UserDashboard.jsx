'use client'

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
  Bell,  
  Star,
  Settings,
  LogOut,
} from "lucide-react";
import { getAuthStatus } from "@/helper/auth";
import { API_URL } from "@/constants/env";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { isAuthenticated, user } = await getAuthStatus();
        if (isAuthenticated && user) {
          setUser(user);
          fetchUserAvatar(user);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    const fetchUserAvatar = async (userData) => {
      try {
        const response = await axios.get(`${API_URL}/api/usuarios/obtener-avatar`, {
          withCredentials: true,
        });
  
        if (response.status === 200) {
          const avatarUrl = response.data.avatarUrl;
          setUser((prevUser) => ({
            ...prevUser,
            avatar: avatarUrl
          }));
        } else {
          console.error("Error al obtener el avatar:", response.data.mensaje);
        }
      } catch (error) {
        console.error("Error al obtener el avatar:", error);
      } finally {
        setLoading(false);
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

  const handleAvatarLoad = () => {
    setAvatarLoaded(true);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <Skeleton className="h-12 w-[250px]" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[125px] w-full" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <div>No se pudo cargar la información del usuario.</div>;
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
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notificaciones</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Avatar className="h-20 w-20">
            {user.avatar && (
              <AvatarImage
                src={user.avatar}
                alt={user.nombre}
                onLoad={handleAvatarLoad}
                style={{ display: avatarLoaded ? 'block' : 'none' }}
              />
            )}
            <AvatarFallback>{user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
          </Avatar>
        </div>
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
                      Pedido #{order.id} - {order.date}
                    </p>
                  </div>
                  <Badge className="ml-auto h-8">{order.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/pedidos")}>
              Ver todos los pedidos
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mejor Valorados</CardTitle>
            <CardDescription>Productos que has calificado bien</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-3">
              {[
                { id: "A01", name: "Cámara Profesional", rating: 5 },
                { id: "B02", name: "Parlante Bluetooth", rating: 4 },
                { id: "C03", name: "Smartwatch Deportivo", rating: 5 },
              ].map((product) => (
                <div key={product.id} className="flex items-center">
                  <Star className="mr-2 h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-medium">{product.name}</span>
                  <div className="ml-auto font-bold text-muted-foreground">
                    {product.rating} estrellas
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/productos")}>
              Ver todos los productos
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Accede rápidamente a las funciones más utilizadas</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Button onClick={() => navigate("/perfil")} className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" /> Editar Perfil
          </Button>
          <Button onClick={() => navigate("/lista-deseos")} className="w-full justify-start">
            <Heart className="mr-2 h-4 w-4" /> Ver Lista de Deseos
          </Button>
          <Button onClick={() => navigate("/programa-fidelidad")} className="w-full justify-start">
            <Gift className="mr-2 h-4 w-4" /> Programa de Fidelidad
          </Button>
          <Button onClick={handleLogout} variant="destructive" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;