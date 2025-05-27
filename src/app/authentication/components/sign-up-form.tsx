import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const registerSchema = z.object({
    name: z.string().trim().min(1, {message: "O nome é obrigatório"}),
    email: z.string().trim().min(1, {message: "E-mail é obrigatório"}).email({message: "E-mail inválido"}),
    password: z.string().trim().min(8, "A senha deve ter pelo menos 8 caracteres"),
})

export function SignUpForm() {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        console.log(values)
    }

    return(
        <Card>
            <Form {...form} >
                <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-8"
                >
                    <CardHeader>
                    <CardTitle>Cadastre-se.</CardTitle>
                    <CardDescription>
                        Crie uma conta para continuar.
                    </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                            <Input placeholder="Insira seu nome" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

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
                            <Input placeholder="Crie uma senha (min 8 caracteres)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </CardContent>

                    <CardFooter>
                    <Button type="submit" className="w-full">Criar conta</Button>
                    </CardFooter>

                </form>
            </Form>
        </Card>
    )
}