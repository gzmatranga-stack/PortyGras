export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">PortyGras</h1>
        <p>Find restrooms in New Orleans during events</p>
      </div>

      <div className="relative flex place-items-center">
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
          <p>Map will be here</p>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <button className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          Filter
        </button>
        <button className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          Find Bathroom
        </button>
      </div>
    </main>
  )
}