import { DataTracker } from "@/types";
import { TrackerActions } from "@/reducer/reducer";
import { Badge } from "@/components/ui/badge";
import { Dispatch } from "react";
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { formatNumberToCop } from "@/utils/utils";
import { Button } from "./ui/button";

import TotalDisplay from "./TotalDisplay";

type TrackerListProps = {
  expenses: DataTracker[];
  dispatch: Dispatch<TrackerActions>;
};

const categoryColors: { [key: string]: string } = {
  Comida: "bg-red-500 text-white",
  Transporte: "bg-blue-500 text-white",
  Entretenimiento: "bg-green-500 text-white",
  Servicios: "bg-yellow-500 text-black",
  Otros: "bg-purple-500 text-white",
};

const TrackerList = ({ expenses, dispatch }: TrackerListProps) => {
  const handleDelete = (id: DataTracker["id"]) => {
    dispatch({ type: "delete-tracker", payload: { id } });
  };
  const isEmpty = expenses.length === 0;

  const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div>
      {isEmpty ? (
        <p className="text-center font-semibold">No hay gastos registrados</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descripción</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((data) => {
                const { id, description, amount, category } = data;
                const total = formatNumberToCop(amount);
                return (
                  <TableRow key={id}>
                    <TableCell className="font-semibold">
                      {description}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className={`${categoryColors[category]} shadow-none`}
                      >
                        {category}
                      </Badge>
                    </TableCell>
                    <TableCell>{total}</TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Eliminará
                              permanentemente este gasto y sus datos asociados.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500"
                              onClick={() => handleDelete(id)}
                            >
                              Sí, eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TotalDisplay totalAmount={totalAmount} />
        </>
      )}
    </div>
  );
};

export default TrackerList;
