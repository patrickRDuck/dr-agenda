
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignUpForm } from "./components/sign-up-form";
import { SignInForm } from "./components/sign-in-forms";
import { redirect } from "next/navigation";
import { headers } from "next/headers"
import { auth } from "@/lib/auth";

export default async function AuthenticationPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Criar conta</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <SignInForm />
        </TabsContent>

        <TabsContent value="register">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
