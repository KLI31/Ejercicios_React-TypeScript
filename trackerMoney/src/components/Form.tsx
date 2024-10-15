import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dispatch } from "react";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DataTracker } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { TrackerActions, TrackerState } from "@/reducer/reducer";

type FormProps = {
  dispatch: Dispatch<TrackerActions>;
  state: TrackerState;
};
const initialState: DataTracker = {
  id: uuidv4(),
  description: "",
  amount: 0,
  category: "",
};

const Form = ({ dispatch }: FormProps) => {
  const [formData, setFormData] = useState<DataTracker>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ["amount"].includes(e.target.id);
    setFormData({
      ...formData,
      [e.target.id]:
        isNumberField && e.target.value !== ""
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-tracker", payload: { newData: formData } });
    toast.success("¡Gasto agregado!", {
      description: "El gasto se ha agregado correctamente",
      duration: 4000,
    });
    setFormData({ ...initialState, id: uuidv4() });
  };

  const isDisabled = () => {
    const { description, amount } = formData;
    return description.trim() === "" || amount <= 0;
  };

  return (
    <>
      <div className="mt-5">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="description" id="description">
              Descripción
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Ej: Compra de comestibles"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="">
            <Label htmlFor="amount" id="amount">
              Monto
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              required
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <Label>Categoría</Label>
            <Select
              value={formData.category || ""}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, category: value }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {Categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" type="submit" disabled={isDisabled()}>
            {" "}
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Gasto
          </Button>
        </form>
      </div>
    </>
  );
};

export default Form;
