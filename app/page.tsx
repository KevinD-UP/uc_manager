import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Welcome to My App</h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/client/">
            <Button size="lg" className="w-full">
              Client Area
            </Button>
          </Link>

          <Link href="/admin/">
            <Button size="lg" variant="outline" className="w-full">
              Admin Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

