import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { API_URL } from "@/constants/env";

const AccountSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
    newsletter: false,
  });

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/usuarios/profile`, { withCredentials: true });
        setSettings(prevSettings => ({
          ...prevSettings,
          ...response.data,
          password: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } catch (error) {
        console.error("Error fetching user settings:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las configuraciones del usuario.",
          variant: "destructive",
        });
      }
    };

    fetchUserSettings();
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSwitchChange = (name) => {
    setSettings({ ...settings, [name]: !settings[name] });
  };

  const handleSaveSettings = async () => {
    try {
      await axios.put(`${API_URL}/api/usuarios/profile`, settings, { withCredentials: true });
      toast({
        title: "Configuración actualizada",
        description: "Tu configuración de cuenta ha sido actualizada correctamente.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la configuración.",
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = async () => {
    if (settings.newPassword !== settings.confirmPassword) {
      toast({
        title: "Error",
        description: "Las nuevas contraseñas no coinciden.",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.put(`${API_URL}/api/auth/change-password`, {
        currentPassword: settings.password,
        newPassword: settings.newPassword,
      }, { withCredentials: true });

      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada correctamente.",
      });

      setSettings(prevSettings => ({
        ...prevSettings,
        password: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Error",
        description: "No se pudo cambiar la contraseña.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Configuración de la Cuenta</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cambiar Contraseña</CardTitle>
            <CardDescription>Actualiza tu contraseña aquí</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña Actual</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={settings.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={settings.newPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirmar Nueva Contraseña
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={settings.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleChangePassword}>Cambiar Contraseña</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preferencias de Notificación</CardTitle>
            <CardDescription>
              Gestiona tus preferencias de notificación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Notificaciones de Pedidos</Label>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={() => handleSwitchChange("notifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="newsletter">Suscripción al Boletín</Label>
              <Switch
                id="newsletter"
                checked={settings.newsletter}
                onCheckedChange={() => handleSwitchChange("newsletter")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings} className="w-full">
              Guardar Preferencias
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettings;