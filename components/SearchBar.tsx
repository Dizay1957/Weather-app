'use client';

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-6 py-4 pl-14 pr-14 text-lg rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-md focus:border-blue-400 focus:bg-white/20 focus:outline-none text-white placeholder-gray-300 shadow-xl transition-all duration-200"
          disabled={isLoading}
        />
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
        {isLoading && (
          <Loader2 className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400 animate-spin" />
        )}
      </div>
    </form>
  );
}
