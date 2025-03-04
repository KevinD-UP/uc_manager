"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

export default function AdminPage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-8">
            <div className="w-full max-w-7xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <Link href="/admin/create">
                        <Button>Create New Client</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Client List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Client Name</TableHead>
                                    <TableHead>Plan</TableHead>
                                    <TableHead>ISIN Codes</TableHead>
                                    <TableHead>API Key</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockClients.map((client, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{client.clientName}</TableCell>
                                        <TableCell>{client.selectedPlan}</TableCell>
                                        <TableCell>{client.isinCodes.join(", ")}</TableCell>
                                        <TableCell>{client.apiKey}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="flex justify-center mt-8">
                    <Link href="/">
                        <Button variant="outline">Back to Home</Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}

