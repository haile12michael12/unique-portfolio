import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/lib/ThemeContext';
import { Sun, Moon, Command, Menu, X, HelpCircle, Search } from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import Logo from '@/components/ui/Logo';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { NAV_ITEMS, KEYBOARD_SHORTCUTS } from '@/data/navigation.data';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggle } = useTheme();
  const location = useLocation();

  const filteredNavItems = searchQuery
    ? NAV_ITEMS.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : NAV_ITEMS;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
      if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowShortcuts((open) => !open);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener("keydown", down);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener("keydown", down);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border' : ''
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        {/* Brand logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo size={28} className="transition-transform duration-300 group-hover:scale-110" />
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase group-hover:text-primary transition-colors">
            Hailemichael
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {filteredNavItems.map((item, i) => {
            const href = item.hash ? `${item.path}${item.hash}` : item.path;
            return (
              <Link
                key={item.label}
                to={href}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative px-4 py-2 group"
                title={item.description}
              >
                <AnimatePresence mode="wait">
                  {hoveredIdx === i ? (
                    <motion.span
                      key="path"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="font-mono text-xs text-primary"
                    >
                      {item.displayPath}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className={`font-mono text-xs tracking-wider uppercase ${
                        location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>

        {/* Theme toggle + Advanced features */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="hidden md:flex p-2 text-muted-foreground hover:text-primary transition-colors"
            title="Search navigation (Cmd+/)"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            title="Keyboard shortcuts (Ctrl+/)"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCommandOpen(true)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            title="Open Command Palette (Ctrl+K)"
          >
            <Command className="w-4 h-4" />
          </button>

          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.9 }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-border/50 hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.span key="sun" initial={{ opacity: 0, rotate: -30 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 30 }} transition={{ duration: 0.2 }}>
                  <Sun className="w-3.5 h-3.5" />
                </motion.span>
              ) : (
                <motion.span key="moon" initial={{ opacity: 0, rotate: 30 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -30 }} transition={{ duration: 0.2 }}>
                  <Moon className="w-3.5 h-3.5" />
                </motion.span>
              )}
            </AnimatePresence>
            <span className="font-mono text-[10px] tracking-widest uppercase hidden lg:inline">
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </motion.button>
          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="p-2 md:hidden text-muted-foreground hover:text-primary transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {filteredNavItems.map((item) => {
                const href = item.hash ? `${item.path}${item.hash}` : item.path;
                return (
                  <Link
                    key={item.label}
                    to={href}
                    onClick={() => {
                      setHoveredIdx(null);
                      setMobileOpen(false);
                      setSearchQuery('');
                    }}
                    className={`block rounded-xl px-4 py-3 text-sm font-mono tracking-wide transition-colors ${
                      location.pathname === item.path ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent/70 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}


            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 border-b border-border/50 bg-background/95 backdrop-blur-xl shadow-lg"
          >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4">
              <div className="flex items-center gap-3 border border-border/50 px-4 py-2.5 mb-3">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pages and sections..."
                  className="flex-1 bg-transparent outline-none font-mono text-sm text-foreground placeholder:text-muted-foreground/50"
                />
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="font-mono text-[10px] text-muted-foreground hover:text-primary uppercase tracking-wider"
                >
                  Esc
                </button>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-1 max-h-64 overflow-y-auto">
                {filteredNavItems.map((item) => {
                  const href = item.hash ? `${item.path}${item.hash}` : item.path;
                  return (
                    <Link
                      key={item.label}
                      to={href}
                      onClick={() => { setSearchOpen(false); setSearchQuery(''); setMobileOpen(false); }}
                      className="flex flex-col gap-0.5 px-4 py-3 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <span className="font-mono text-xs text-primary">{item.label}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{item.displayPath}</span>
                    </Link>
                  );
                })}
                {filteredNavItems.length === 0 && (
                  <p className="col-span-full px-4 py-3 font-mono text-xs text-muted-foreground">No results found.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard shortcuts dialog */}
      <Dialog open={showShortcuts} onOpenChange={setShowShortcuts}>
        <DialogContent className="max-w-md border-border/60 bg-card/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="font-syne text-xl">Keyboard Shortcuts</DialogTitle>
            <DialogDescription className="font-mono text-xs">
              Power-user navigation for the portfolio system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-2">
            {KEYBOARD_SHORTCUTS.map((shortcut) => (
              <div
                key={shortcut.key}
                className="flex items-center justify-between gap-4 px-3 py-2.5 border border-border/40 rounded-lg"
              >
                <div>
                  <p className="text-sm text-foreground">{shortcut.action}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{shortcut.context}</p>
                </div>
                <kbd className="font-mono text-[10px] px-2 py-1 border border-border/60 bg-background text-primary whitespace-nowrap">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </motion.nav>
  );
}
