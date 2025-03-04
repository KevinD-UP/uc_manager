"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function ClientEntryPage() {
    const [apiKey, setApiKey] = useState("")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (apiKey.trim()) {
            router.push(`/client/${apiKey}`)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Client Access</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                                Enter your API Key
                            </label>
                            <Input
                                type="text"
                                id="apiKey"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="Your API Key"
                                className="mt-1"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Access Dashboard
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}

