"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import  UpesertDoctorForm  from "./upsert-doctor-form";
import { useState } from "react";

export function AddDoctorButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Adicionar médico
                </Button>
            </DialogTrigger>

            <UpesertDoctorForm  onSuccess={() => setIsOpen(false)}/>
        </Dialog>
    )
}