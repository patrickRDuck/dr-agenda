import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import {AddPatientButton} from "./_components/add-patient-button";
import {DataTable } from "@/components/ui/data-table"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { patientsTable } from "@/db/schema";
import { patientsTableColumns } from "./_components/table-columns";


export default async function PatientsPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user) {
        redirect("/authentication")
    }

    if(!session?.user.clinic) {
        redirect("/clinic-form")
    }

    const patients = await db.query.patientsTable.findMany({
        where: eq(patientsTable.clinicId ,session.user.clinic.id)
    })

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Patients</PageTitle>

                    <PageDescription>
                        Gerencia os pacientes de sua clínica.
                    </PageDescription>
                </PageHeaderContent>

                <PageActions>
                    <AddPatientButton />
                </PageActions>

            </PageHeader>

            <PageContent>
                <DataTable data={patients}  columns={patientsTableColumns} />
            </PageContent>
        </PageContainer>
    )
}