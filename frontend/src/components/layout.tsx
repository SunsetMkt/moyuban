import { Outlet } from 'react-router-dom';
import { Header } from './header';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-screen-xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>
          摸鱼办 - 一个集成各种工具的网站 |{' '}
          <a
            href="https://github.com/dreamhunter2333/moyuban"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
