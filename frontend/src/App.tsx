import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Layout } from '@/components/layout';
import {
  HomePage,
  ToolsPage,
  ProgressPage,
  AboutPage,
  PasswordPage,
  UrlEncoderPage,
  Base64Page,
  ShareToolPage,
} from '@/pages';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="tools">
              <Route index element={<ToolsPage />} />
              <Route path="password" element={<PasswordPage />} />
              <Route path="url-encoder" element={<UrlEncoderPage />} />
              <Route path="base64" element={<Base64Page />} />
              <Route path="share-tool" element={<ShareToolPage />} />
            </Route>
            <Route path="progress" element={<ProgressPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
