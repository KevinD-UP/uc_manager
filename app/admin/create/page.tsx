"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, CheckSquare, Key } from "lucide-react"
import { parseCSV } from "../../actions/parseCSV"
import { generateApiKey } from "../../actions/generateApiKey"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminCreatePage() {
  const [clientName, setClientName] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("")
  const [csvData, setCsvData] = useState<any[]>([])
  const [filteredCsvData, setFilteredCsvData] = useState<any[]>([]) // Ajout d'un état pour stocker les données filtrées
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setApiKey(null) // Reset API key when new file is uploaded

    try {
      const text = await file.text()
      const result = await parseCSV(text)

      setCsvData(result as any[])

      // Filtrer uniquement les colonnes contenant "ISIN"
      const filteredData = (result as any[]).map(row =>
          Object.keys(row)
              .filter(key => key.includes("ISIN"))
              .reduce((acc, key) => {
                acc[key] = row[key]
                return acc
              }, {} as Record<string, any>)
      )

      setFilteredCsvData(filteredData) // Stocke les données filtrées

      const initialSelectedState: Record<string, boolean> = {}
      filteredData.forEach((_, index) => {
        initialSelectedState[index] = true
      })
      setSelectedItems(initialSelectedState)
    } catch (error) {
      console.error("Error parsing CSV:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleItem = (index: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const selectAll = () => {
    const newSelectedItems = { ...selectedItems }
    const allSelected = Object.values(selectedItems).every((value) => value)

    Object.keys(selectedItems).forEach((key) => {
      newSelectedItems[key] = !allSelected
    })

    setSelectedItems(newSelectedItems)
  }

  const getSelectedCount = () => {
    return Object.values(selectedItems).filter(Boolean).length
  }

  const handleGenerateApiKey = async () => {
    if (!clientName || !selectedPlan) {
      alert("Please enter a client name and select a plan before generating an API key.")
      return
    }
    const selectedData = csvData.filter((_, index) => selectedItems[index])
    const newApiKey = await generateApiKey()
    setApiKey(newApiKey)
  }

  return (
      <main className="flex min-h-screen flex-col items-center p-8">
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-bold mb-6">Create New Client</h1>

          <Card className="p-6 mb-8 h-[calc(100vh-12rem)]">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                    id="clientName"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter client name"
                    className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="plan">Plan</Label>
                <Select onValueChange={setSelectedPlan} value={selectedPlan}>
                  <SelectTrigger id="plan" className="mt-1">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Import CSV Data</h2>

            <div className="flex items-center gap-4 mb-6">
              <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" ref={fileInputRef} />
              <Button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2">
                <Upload size={16} />
                Select CSV File
              </Button>
              <div className="text-sm text-muted-foreground">
                {isLoading ? "Processing..." : csvData.length > 0 ? `${csvData.length} rows loaded` : "No file selected"}
              </div>
            </div>

            {csvData.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">CSV Data</h3>
                    <div className="flex items-center gap-4">
                  <span className="text-sm">
                    {getSelectedCount()} of {csvData.length} selected
                  </span>
                      <Button variant="outline" size="sm" onClick={selectAll} className="flex items-center gap-2">
                        <CheckSquare size={16} />
                        {Object.values(selectedItems).every((value) => value) ? "Unselect All" : "Select All"}
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md overflow-hidden mb-6 h-[calc(100%-18rem)]">
                    <div className="h-full overflow-y-auto">
                      <table className="w-full">
                        <thead className="bg-muted sticky top-0">
                        <tr>
                          <th className="p-2 text-left font-medium">Select</th>
                          {Object.keys(csvData[0]).map((header, i) => (
                              <th key={i} className="p-2 text-left font-medium">
                                {header}
                              </th>
                          ))}
                        </tr>
                        </thead>
                        <tbody>
                        {csvData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-t">
                              <td className="p-2">
                                <Checkbox
                                    checked={selectedItems[rowIndex] || false}
                                    onCheckedChange={() => toggleItem(rowIndex.toString())}
                                    id={`item-${rowIndex}`}
                                />
                              </td>
                              {Object.values(row).map((cell, cellIndex) => (
                                  <td key={cellIndex} className="p-2 truncate max-w-[200px]">
                                    {cell as string}
                                  </td>
                              ))}
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <Button
                        onClick={handleGenerateApiKey}
                        disabled={getSelectedCount() === 0 || !clientName || !selectedPlan}
                        className="flex items-center gap-2"
                    >
                      <Key size={16} />
                      Generate API Key
                    </Button>
                    {apiKey && (
                        <div className="flex items-center gap-2 flex-grow ml-4">
                          <Input value={apiKey} readOnly className="font-mono flex-grow" />
                          <Button onClick={() => navigator.clipboard.writeText(apiKey)} variant="outline">
                            Copy
                          </Button>
                        </div>
                    )}
                  </div>
                </div>
            )}
          </Card>

          <div className="flex justify-center mt-8">
            <Link href="/admin">
              <Button variant="outline">Back to Admin Dashboard</Button>
            </Link>
          </div>
        </div>
      </main>
  )
}

