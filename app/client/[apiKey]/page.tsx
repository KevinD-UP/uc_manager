export default function ClientPage({ params }: { params: { apiKey: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>
        <p className="text-xl mb-4">API Key: {params.apiKey}</p>

        <div className="mt-8">
          <a href="/" className="text-blue-500 hover:underline">
            Back to Home
          </a>
        </div>
      </div>
    </main>
  )
}

