import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

function AddDivingSpot() {
  const router = useRouter();
  const [contribution, setContribution] = useState({
    amount: 0,
    year: new Date().getFullYear(),
    lat: 0,
    lng: 0,
  });

  const handleNextStep = () => {
    if (
      contribution.amount > 0 &&
      contribution.year >= new Date().getFullYear()
    ) {
      router.push(
        "/contributions/checkout?amount=" +
          contribution.amount +
          "&year=" +
          contribution.year
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Agregar Spot</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] bg-[#ffffff] z-50 border-slate-300 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl mb-[32px]">
            Agregar nuevo lugar de buceo
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-base mb-[24px]">
          Indicar datos del lugar de buceo como sus coordenadas, nombre,
          imagenes, profundidad maxima, especies que puedes encontrar, etc.
        </DialogDescription>
        <div className="flex flex-col gap-[32px] mb-[32px]">
          <div className="flex flex-col gap-[12px]">
            <Label htmlFor="name">Nombre</Label>
            <Input
              type="text"
              id="name"
              placeholder="Nombre del lugar"
              className="w-full"
              onChange={(e) =>
                setContribution({
                  ...contribution,
                  amount: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-[12px]">
            <Label htmlFor="coordinates">
              Coordenadas <small>(latitud, longitud)</small>
            </Label>
            <div className="grid grid-cols-2 gap-[16px]">
              <Input
                type="number"
                id="latitude"
                placeholder="Latitud"
                className="w-full"
                onChange={(e) =>
                  setContribution({
                    ...contribution,
                    lat: parseFloat(e.target.value),
                  })
                }
              />
              <Input
                type="number"
                id="longitude"
                placeholder="Longitud"
                className="w-full"
                onChange={(e) =>
                  setContribution({
                    ...contribution,
                    lng: parseFloat(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleNextStep}
            disabled={!contribution.amount || !contribution.year}
          >
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDivingSpot;
