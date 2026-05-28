import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/lib/ThemeContext';
import { Sun, Moon, Command, Menu, X, HelpCircle, Search } from 'lucide-react';
import { CommandPalette } from './CommandPalette';
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
        {/* System identifier */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
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

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </motion.nav>
  );
}
