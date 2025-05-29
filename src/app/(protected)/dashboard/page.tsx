import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { SignOutButton } from "./_components/sing-out-button"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user) {
        redirect("/authentication")
    }

    if(!session?.user.clinic) {
        redirect("/clinic-form");
    }

    return(
        <div className="h-screen w-screen flex items-center justify-center flex-col">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <h2>{session?.user.email}</h2>
            <SignOutButton />
        </div>
    )
}