'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import BathroomModal from './components/BathroomModal';
import FilterModal from './components/FilterModal';

const BathroomMap = dynamic(() => import('./components/BathroomMap'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-200 flex items-center justify-center">Loading map...</div>,
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredBar, setFilteredBar] = useState<any>(null);

  const handleFilter = (bar: any) => {
    setFilteredBar(bar);
    setIsModalOpen(true);
    setIsFilterOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 border-4 border-purple-500">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">PortyGras</h1>
        <p>Find bars and restaurants in New Orleans during events</p>
      </div>

      <div className="relative flex place-items-center w-full">
        <div className="w-full h-96 rounded-lg overflow-hidden border-4 border-purple-300">
          <BathroomMap />
        </div>
      </div>

      <div className="mt-8 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left gap-4">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="group rounded-lg border-2 border-green-500 px-5 py-4 transition-colors hover:border-green-700 hover:bg-green-50 font-semibold text-green-700"
        >
          Filter
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="group rounded-lg border-2 border-green-500 px-5 py-4 transition-colors hover:border-green-700 hover:bg-green-50 font-semibold text-green-700"
        >
          Find Bar
        </button>
      </div>

      <BathroomModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFilteredBar(null);
        }}
        filteredBar={filteredBar}
      />
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilter={handleFilter}
      />
    </main>
  )
}