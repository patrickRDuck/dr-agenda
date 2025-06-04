import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container"
import { DatePicker } from "./_components/date-picker"
import { db } from "@/db"
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema"
import { and, count, eq, gte, lte, sql, sum } from "drizzle-orm"
import { StatsCards } from "./_components/stats-card"
import dayjs from "dayjs"
import { AppointmentsChart } from "./_components/appointments-chart"
import { getDashboard } from "@/data/get-dashboard";
import TopDoctors from "./_components/top-doctors"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { appointmentsTableColumns } from "../appointments/_components/table-columns"
import TopSpecialties from "./_components/top-specialties"

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

    const {
        totalRevenue,
        totalAppointments,
        totalPatients,
        totalDoctors,
        topDoctors,
        topSpecialties,
        todayAppointments,
        dailyAppointmentsData,
      } = await getDashboard({
        from,
        to,
        session: {
          user: {
            clinic: {
              id: session.user.clinic.id,
            },
          },
        },
    });

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

                <div className="grid grid-cols-[2.25fr_1fr]">
                    <AppointmentsChart dailyAppointmentsData={dailyAppointmentsData}/>

                    <TopDoctors doctors={topDoctors} />
                </div>

                <div className="grid grid-cols-[2.25fr_1fr] gap-4">
                    <Card>
                        <CardHeader>
                        <div className="flex items-center gap-3">
                            <Calendar className="text-muted-foreground" />
                            <CardTitle className="text-base">
                            Agendamentos de hoje
                            </CardTitle>
                        </div>
                        </CardHeader>
                        <CardContent>
                        <DataTable
                            columns={appointmentsTableColumns}
                            data={todayAppointments}
                        />
                        </CardContent>
                    </Card>
                    <TopSpecialties topSpecialties={topSpecialties} />
                </div>
            </PageContent>
        </PageContainer>
    )
}