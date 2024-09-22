import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const ProductForm = ({ formData, handleInputChange, handleSwitchChange, handleImageUpload }) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">Nombre</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">Precio</Label>
        <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="stock" className="text-right">Stock</Label>
        <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleInputChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-right">Categoría</Label>
        <Select id="category" name="category" value={formData.category} onValueChange={(value) => handleInputChange({ target: { name: 'category', value } })} className="col-span-3">
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="categoria1">Categoría 1</SelectItem>
            <SelectItem value="categoria2">Categoría 2</SelectItem>
            <SelectItem value="categoria3">Categoría 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">Descripción</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="isActive" className="text-right">Estado</Label>
        <Switch id="isActive" checked={formData.isActive} onCheckedChange={handleSwitchChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="image" className="text-right">Imagen</Label>
        <div className="col-span-3">
          <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
          {formData.image && <img src={formData.image} alt="Producto" className="w-20 h-20 object-cover rounded" />}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
