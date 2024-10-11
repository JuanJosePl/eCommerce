import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  currentProduct,
  formData,
  handleInputChange,
  handleSwitchChange,
  handleImageUpload,
  handleSubmit,
  categories = [],
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>
            {currentProduct ? "Editar Producto" : "Añadir Nuevo Producto"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="precio" className="text-right">
                Precio
              </Label>
              <Input
                id="precio"
                name="precio"
                type="number"
                value={formData.precio}
                onChange={handleInputChange}
                className="col-span-3"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                className="col-span-3"
                required
                min="0"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoria" className="text-right">
                Categoría
              </Label>
              {categories.length > 0 ? (
                <Select
                  name="categoria"
                  value={formData.categoria}
                  onValueChange={(value) => handleInputChange({ target: { name: 'categoria', value } })}
                >
                  <SelectTrigger className="col-span-3 bg-background">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Ingresa una categoría"
                  required
                />
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descripcion" className="text-right">
                Descripción
              </Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="activo" className="text-right">
                Activo
              </Label>
              <Switch
                id="activo"
                name="activo"
                checked={formData.activo}
                onCheckedChange={handleSwitchChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imagenes" className="text-right">
                Imágenes
              </Label>
              <Input
                id="imagenes"
                name="imagenes"
                type="file"
                onChange={handleImageUpload}
                className="col-span-3"
                accept="image/*"
                multiple
              />
            </div>
            {formData.imagenes && formData.imagenes.length > 0 && (
              <div className="col-span-4">
                <div className="grid grid-cols-3 gap-2">
                  {Array.from(formData.imagenes).map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Vista previa ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">
              {currentProduct ? "Actualizar Producto" : "Añadir Producto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;