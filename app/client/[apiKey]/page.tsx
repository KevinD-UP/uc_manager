"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {useParams} from "next/navigation";

// Mock data
const mockClients = [
    {
        clientName: "Acme Corp",
        selectedPlan: "pro",
        isinCodes: ["US0378331005", "US0231351067", "US5949181045"],
        apiKey: "ABCDEF123456",
    },
    {
        clientName: "TechStart Inc",
        selectedPlan: "basic",
        isinCodes: ["US88160R1014", "US0079031078", "US02079K1079"],
        apiKey: "GHIJKL789012",
    },
    {
        clientName: "Global Traders Ltd",
        selectedPlan: "pro",
        isinCodes: ["US0605051046", "US1912161007", "US4581401001"],
        apiKey: "MNOPQR345678",
    },
]

export default function ClientPage() {
    const params = useParams<{ apiKey: string }>();

    const [clientData, setClientData] = useState<(typeof mockClients)[0] | null>(null)

    useEffect(() => {
        // Simulate API call to get client data
        const client = mockClients.find((c) => c.apiKey === params.apiKey)
        setClientData(client || null)
    }, [params.apiKey])

    if (!clientData) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-24">
                <h1 className="text-3xl font-bold mb-6">Client Not Found</h1>
                <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                </Link>
            </main>
        )
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
                <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>{clientData.clientName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            <strong>Plan:</strong> {clientData.selectedPlan}
                        </p>
                        <p>
                            <strong>API Key:</strong> {clientData.apiKey}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>ISIN Codes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ISIN</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clientData.isinCodes.map((isin, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{isin}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="mt-8">
                    <Link href="/">
                        <Button variant="outline">Back to Home</Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}

