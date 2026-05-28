import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Search as SearchIcon } from 'lucide-react';
import { NAV_ITEMS } from '@/data/navigation.data';

export default function SearchOverlay({ open, onClose, query, setQuery }) {
  useEffect(() => {
    if (open) {
      const el = document.getElementById('global-search-input');
      el?.focus();
    }
  }, [open]);

  if (!open) return null;

  const filtered = NAV_ITEMS.filter(item =>
    item.label.toLowerCase().includes((query || '').toLowerCase()) ||
    item.description?.toLowerCase().includes((query || '').toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-60 flex items-start justify-center pt-24">
      <div className="w-full max-w-2xl mx-4 bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-lg">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <SearchIcon className="w-4 h-4 text-muted-foreground" />
          <input
            id="global-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search navigation..."
            className="flex-1 bg-transparent outline-none text-sm px-2 py-1"
          />
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-primary">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="max-h-64 overflow-auto">
          {filtered.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">No results</div>
          ) : (
            filtered.map(item => (
              <Link
                key={item.label}
                to={item.hash ? `${item.path}${item.hash}` : item.path}
                onClick={() => {
                  setQuery('');
                  onClose();
                }}
                className="block px-4 py-3 hover:bg-accent/60"
              >
                <div className="font-mono text-xs text-primary">{item.displayPath}</div>
                <div className="font-mono text-sm">{item.label}</div>
                {item.description && <div className="text-muted-foreground text-xs">{item.description}</div>}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
