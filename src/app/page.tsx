"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  function handleButton () {
    router.push('/authentication')
  }

  return(
    <div className="w-full h-screen flex justify-center items-center bg-gray-300">
      <Button onClick={handleButton} className="mx-auto my-15 px-14 py-6">
        Teste
      </Button>
    </div>
  )
}