"use client";
import { Button } from "@/components/ui/button";
import { FarmType } from "@/types/itemTypes";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPinIcon, VeganIcon } from "lucide-react";
import InvestButton from "./invest-button";

export default function FarmModal({ farm }: { farm: FarmType }) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full bg-green-600 hover:bg-green-700">
            View Details
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{farm.farm_name}</DialogTitle>
            <DialogDescription>By {farm.farmer.name}</DialogDescription>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-zinc-500 text-sm">
                <MapPinIcon className="h-3.5 w-3.5 !mr-1" />
                {farm.location}
              </div>
              <div className="flex items-center text-zinc-500 text-sm">
                Size: {farm.size}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-zinc-500 text-sm">
                <VeganIcon className="h-3.5 w-3.5 !mr-1" />
                {farm.crop_type}
              </div>
              <div className="flex items-center text-zinc-500 text-sm">
                Crop status: {farm.crop_status}
              </div>
            </div>
            <p className="text-zinc-500 text-sm">
              Operational cost: {farm.operational_costs}
            </p>
            <hr />
          </DialogHeader>
          <DialogFooter>
            <InvestButton id={farm.id} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
