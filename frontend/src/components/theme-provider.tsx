import { useEffect } from 'react';
import { useAppStore } from '@/store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDark = useAppStore((state) => state.isDark);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return <>{children}</>;
}
