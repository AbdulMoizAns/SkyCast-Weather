import { MapPin } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  loading: boolean;
}

export function SearchBar({ onSearch, onLocationClick, loading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery('');
    }
  };

  return (
    <div className="w-full mb-12">
      <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-[rgba(255,255,255,0.08)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] rounded-2xl p-3">
        <button
          type="button"
          onClick={onLocationClick}
          disabled={loading}
          className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 shrink-0"
          title="Use current location"
          aria-label="Use current location"
        >
          <MapPin className="h-4 w-4 text-white" />
        </button>
        <input
          type="text"
          className="flex-1 bg-transparent border-none text-white text-base outline-none placeholder:text-[rgba(255,255,255,0.6)]"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          aria-label="Search city"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="hidden"
          aria-label="Submit search"
        >
          Search
        </button>
      </form>
    </div>
  );
}
