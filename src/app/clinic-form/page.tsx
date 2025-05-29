import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ClinicForm } from "./components/form"

export default function ClinicFormPage() {

    return(
        <div className="h-screen w-screen flex items-center justify-center">
            <Dialog open>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adicionar clínica</DialogTitle>
                        
                        <DialogDescription>
                            Adicione uma clínica para conitnuar.
                        </DialogDescription>
                    </DialogHeader>

                    <ClinicForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}