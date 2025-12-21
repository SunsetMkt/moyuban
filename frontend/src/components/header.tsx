import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Github, Fish } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store';
import { useIsMobile } from '@/hooks';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: '首页' },
  { path: '/tools', label: '工具' },
  { path: '/progress', label: '进度' },
  { path: '/about', label: '关于' },
];

export function Header() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useAppStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center mx-auto px-4">
        <Link to="/" className="flex items-center gap-2 mr-6">
          <Fish className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl hidden sm:inline">摸鱼办</span>
        </Link>

        {!isMobile && (
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                  size="default"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        )}

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <a
            href="https://github.com/dreamhunter2333/moyuban"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Button>
          </a>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {isMobile && menuOpen && (
        <nav className="border-t bg-background p-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
              >
                <Button
                  variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                  className={cn('w-full justify-start')}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
