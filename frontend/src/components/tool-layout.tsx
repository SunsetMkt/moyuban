import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ToolLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="container max-w-screen-xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/tools')}
          aria-label="返回工具列表"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <Card className="min-h-[400px]">
        <CardHeader>
          <CardTitle>{description || title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
