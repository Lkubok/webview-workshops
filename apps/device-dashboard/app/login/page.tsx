"use client"

import { signIn, getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const session = await getSession()
      if (session) {
        router.push("/dashboard")
      }
    }
    checkAuth()
  }, [router])

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn("keycloak", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Workshop Login</CardTitle>
          <CardDescription>Sign in with your Keycloak account to access the workshop</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogin} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? "Signing in..." : "Sign in with Keycloak"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
