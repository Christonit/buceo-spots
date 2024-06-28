import { useEffect, useState, useContext } from "react";
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
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import db from "@/app/firestore";
import { GlobalContext } from "@/context";

function AddDivingSpot() {
  const router = useRouter();
  const [new_diving_spot, setNewDivingSpot] = useState({
    name: "",
    coordinates: [0, 0],
    description: "",
    images: ["https://via.placeholder.com/150"],
    landmarks: [],
    max_depth: 0,
  });
  const [is_disabled, setIsDisabled] = useState(false);

  const { setLocations } = useContext(GlobalContext);
  const postNewDivingSpot = async () => {
    const new_collection = collection(db, "diving-spots");
    try {
      const res = await addDoc(new_collection, new_diving_spot);

      console.log({ res });

      setLocations((prev: Location[]) => [
        ...prev,
        {
          ...new_diving_spot,
          image: new_diving_spot.images[0],
          title: new_diving_spot.name,
          lat: Number(new_diving_spot.coordinates[0]),
          lng: Number(new_diving_spot.coordinates[1]),
        },
      ]);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    console.log(new_diving_spot);
    if (
      !new_diving_spot.name ||
      !new_diving_spot.coordinates ||
      !new_diving_spot.max_depth ||
      new_diving_spot.name === "" ||
      new_diving_spot.coordinates[0] === 0 ||
      new_diving_spot.coordinates[1] === 0 ||
      new_diving_spot.max_depth === 0
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [new_diving_spot]);

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
                setNewDivingSpot((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-[12px]">
            <Label htmlFor="coordinates">
              Coordenadas{" "}
              <small>(latitud y longitud en Simple decimal standard)</small>
            </Label>
            <div className="grid grid-cols-2 gap-[16px]">
              <Input
                type="number"
                id="latitude"
                placeholder="Latitud"
                className="w-full"
                onChange={(e) =>
                  setNewDivingSpot((prev) => ({
                    ...prev,
                    coordinates: [
                      parseFloat(e.target.value),
                      prev.coordinates[1],
                    ],
                  }))
                }
              />
              <Input
                type="number"
                id="longitude"
                placeholder="Longitud"
                className="w-full"
                onChange={(e) =>
                  setNewDivingSpot((prev) => ({
                    ...prev,
                    coordinates: [
                      prev.coordinates[0],
                      parseFloat(e.target.value),
                    ],
                  }))
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <Label htmlFor="coordinates">Profundidad maxima</Label>
            <Input
              type="number"
              id="max-depth"
              className="w-full"
              onChange={(e) =>
                setNewDivingSpot((prev) => ({
                  ...prev,
                  max_depth: parseFloat(e.target.value),
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-[12px]">
            <Label htmlFor="coordinates">Imagenes</Label>
            <div className="grid grid-cols-3 gap-[16px]">
              <Input
                type="file"
                id="imagenes"
                placeholder="Latitud"
                className="w-full"
                onChange={(e) => {
                  // setContribution({
                  //   ...contribution,
                  //   lat: parseFloat(e.target.value),
                  // })
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <Label htmlFor="coordinates">Descripcion</Label>
            <Textarea
              id="landmarks"
              className="w-full"
              onChange={(e) => {
                setNewDivingSpot((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col gap-[12px]">
            <Label htmlFor="coordinates">Puntos de referencia</Label>
            <Input
              type="text"
              id="landmarks"
              className="w-full"
              onChange={(e) => {
                // setContribution({
                //   ...contribution,
                //   lat: parseFloat(e.target.value),
                // })
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={postNewDivingSpot} disabled={is_disabled}>
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDivingSpot;
