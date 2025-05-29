"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import  UpesertDoctorForm  from "./upsert-doctor-form";

export function AddDoctorButton() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Adicionar médico
                </Button>
            </DialogTrigger>

            <UpesertDoctorForm />
        </Dialog>
    )
}