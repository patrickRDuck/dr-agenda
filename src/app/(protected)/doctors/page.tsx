import { Button } from "@/components/ui/button";
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { Plus } from "lucide-react";

export default function DoctorsPage() {
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Médicos</PageTitle>

                    <PageDescription>Gerencie os médicos da sua clínica.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <Button>
                        <Plus />
                        Adicionar médico
                    </Button>
                </PageActions>
            </PageHeader>

            <PageContent>
                <h1>Médicos</h1>
            </PageContent>
        </PageContainer>
    )
}