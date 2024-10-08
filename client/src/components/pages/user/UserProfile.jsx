import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { API_URL } from "@/constants/env";

const UserProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccionesEnvio: [],
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState({
    calle: "",
    ciudad: "",
    codigoPostal: "",
    pais: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/usuarios/profile`, { withCredentials: true });
        setProfile(response.data);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar el perfil del usuario.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/usuarios/update/profile`, profile, { withCredentials: true });
      setProfile(response.data);
      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado correctamente.",
      });
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast({
        title: "Error",
        description: error.response?.data?.mensaje || "No se pudo actualizar el perfil.",
        variant: "destructive",
      });
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await axios.post(`${API_URL}/api/usuarios/avatar`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });

        setProfile({ ...profile, avatar: response.data.avatarUrl });
        toast({
          title: "Avatar actualizado",
          description: "Tu avatar ha sido actualizado correctamente.",
        });
      } catch (error) {
        console.error("Error al actualizar el avatar:", error);
        toast({
          title: "Error",
          description: error.response?.data?.mensaje || "No se pudo actualizar el avatar.",
          variant: "destructive",
        });
      }
    }
  };
  

  const handleAddAddress = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/usuarios/agregar-direccion`, newAddress, { withCredentials: true });
      setProfile({
        ...profile,
        direccionesEnvio: [...profile.direccionesEnvio, newAddress]
      });
      setNewAddress({ calle: "", ciudad: "", codigoPostal: "", pais: "" });
      toast({
        title: "Dirección añadida",
        description: "La nueva dirección ha sido añadida correctamente.",
      });
    } catch (error) {
      console.error("Error al añadir la dirección:", error);
      toast({
        title: "Error",
        description: error.response?.data?.mensaje || "No se pudo añadir la nueva dirección.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              Actualiza tu información personal aquí
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar} alt="Avatar" />
                <AvatarFallback>{profile.nombre ? profile.nombre.charAt(0) : 'U'}</AvatarFallback>
              </Avatar>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
              <Button onClick={() => document.getElementById('avatar').click()}>
                Cambiar Avatar
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre Completo</Label>
              <Input
                id="nombre"
                name="nombre"
                value={profile.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
            <CardDescription>
              Actualiza tu información de contacto aquí
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                name="telefono"
                value={profile.telefono}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveProfile} className="w-full">
              Guardar Cambios
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Direcciones de Envío</CardTitle>
          <CardDescription>
            Gestiona tus direcciones de envío
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profile.direccionesEnvio.map((direccion, index) => (
              <div key={index} className="p-4 border rounded">
                <p>{direccion.calle}</p>
                <p>{direccion.ciudad}, {direccion.codigoPostal}</p>
                <p>{direccion.pais}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <Label htmlFor="calle">Calle</Label>
            <Input
              id="calle"
              name="calle"
              value={newAddress.calle}
              onChange={handleAddressInputChange}
            />
            <Label htmlFor="ciudad">Ciudad</Label>
            <Input
              id="ciudad"
              name="ciudad"
              value={newAddress.ciudad}
              onChange={handleAddressInputChange}
            />
            <Label htmlFor="codigoPostal">Código Postal</Label>
            <Input
              id="codigoPostal"
              name="codigoPostal"
              value={newAddress.codigoPostal}
              onChange={handleAddressInputChange}
            />
            <Label htmlFor="pais">País</Label>
            <Input
              id="pais"
              name="pais"
              value={newAddress.pais}
              onChange={handleAddressInputChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddAddress} className="w-full">
            Añadir Nueva Dirección
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;