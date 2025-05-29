import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { SignOutButton } from "./_components/sing-out-button"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { usersToClinicsTable } from "@/db/schema"

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user) {
        redirect("/authentication")
    }

    const clinics = await db.query.usersToClinicsTable.findMany({
        where: eq(usersToClinicsTable.userId, session.user.id)
    })
    if(clinics.length === 0) {
        redirect("/clinic-form")
    }

    return(
        <div className="h-screen w-screen flex items-center justify-center flex-col">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <h2>{session?.user.email}</h2>
            <SignOutButton />
        </div>
    )
}