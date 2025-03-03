"use server"

import csvParser from "csv-parser"
import { Readable } from "stream"

export async function parseCSV(csvText: string) {
  const results: any[] = []

  // Create a readable stream from the CSV text
  const stream = Readable.from([csvText])

  // Return a promise that resolves when parsing is complete
  return new Promise((resolve, reject) => {
    stream
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error) => reject(error))
  })
}

