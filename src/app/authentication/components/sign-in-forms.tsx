"use client"

import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
    email: z.string().trim().min(1, {message: "E-mail é obrigatório"}).email({message: "E-mail inválido"}),
    password: z.string().trim().min(8, "A senha deve ter pelo menos 8 caracteres"),
})

export function SignInForm() {
    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
        }, {
            onSuccess: () => {
                router.push("/dashboard");
            },
            onError: () => {
               toast.error("E-mail ou senha inválidos.")
            }
        })
    }

    return(
        <Card>
            <Form {...form} >
                <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-8"
                >
                    <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Faça login para continuar.
                    </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-8">
                    

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                            <Input placeholder="Insira seu E-mail" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                            <Input type="password" placeholder="Insira sua senha" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </CardContent>

                    <CardFooter>
                        <Button type="submit" className="w-full">
                            {
                            form.formState.isSubmitting ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                            ) : "Login"
                            }
                        </Button>
                    </CardFooter>

                </form>
            </Form>
        </Card>
    )
}