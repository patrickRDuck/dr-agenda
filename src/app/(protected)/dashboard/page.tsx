import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container"
import { DatePicker } from "./_components/date-picker"
import { db } from "@/db"
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema"
import { and, count, eq, gte, lte, sum } from "drizzle-orm"
import { StatsCards } from "./_components/stats-card"
import dayjs from "dayjs"

interface DashboardPageProps {
    searchParams: Promise<{
        from: string,
        to: string
    }>
}

export default async function DashboardPage({searchParams}: DashboardPageProps) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user) {
        redirect("/authentication")
    }

    if(!session?.user.clinic) {
        redirect("/clinic-form");
    }
    
    const {from, to} = await searchParams

    if (!from || !to) {
        redirect(
          `/dashboard?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs().add(1, "month").format("YYYY-MM-DD")}`,
        );
    }

    const [totalRevenue, totalAppointments, totalPatients, totalDoctors] = await Promise.all([
        db
        .select({
            total: sum(appointmentsTable.appointmentPriceInCents)
        })
        .from(appointmentsTable)
        .where(
            and(
                eq(appointmentsTable.clinicId, session.user.clinic.id),
                gte(appointmentsTable.date, new Date(from)),
                lte(appointmentsTable.date, new Date(to))
            )
        )
        .then(res => res[0]),
      
        db
        .select({
            total: count()
        })
        .from(appointmentsTable)
        .where(
            and(
                eq(appointmentsTable.clinicId, session.user.clinic.id),
                gte(appointmentsTable.date, new Date(from)),
                lte(appointmentsTable.date, new Date(to))
            )
        )
        .then(res => res[0]),
      
        db
        .select({
            total: count()
        })
        .from(patientsTable)
        .where(
            eq(patientsTable.clinicId, session.user.clinic.id)
        )
        .then(res => res[0]),
      
        db
        .select({
            total: count()
        })
        .from(doctorsTable)
        .where(
            eq(doctorsTable.clinicId, session.user.clinic.id)
        )
        .then(res => res[0]),
    ]);

    return(
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Dashboard</PageTitle>

                    <PageDescription>
                        Tenha uma visão geral de sua clínica.
                    </PageDescription>
                </PageHeaderContent>

                <PageActions>
                    <DatePicker />
                </PageActions>
            </PageHeader>

            <PageContent>
                <StatsCards 
                 totalRevenue={totalRevenue.total ? Number(totalRevenue.total) : null}
                 totalAppointments={totalAppointments.total}
                 totalPatients={totalPatients.total}
                 totalDoctors={totalDoctors.total}
                />
            </PageContent>
        </PageContainer>
    )
}