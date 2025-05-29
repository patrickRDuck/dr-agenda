"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton () {
    const route = useRouter()
    return(
        <Button onClick={() => authClient.signOut({
            fetchOptions: {
                onSuccess: () => route.push("/authentication")
            }
        })}>
            sair
        </Button>
    )
}