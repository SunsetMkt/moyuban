import { useNavigate } from 'react-router-dom';
import { Lock, Link2, FileCode, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const TOOLS = [
  {
    id: 'share-tool',
    title: '分享工具',
    description: '生成分享链接和二维码',
    icon: Share2,
    path: '/tools/share-tool',
  },
  {
    id: 'password',
    title: '密码生成',
    description: '生成安全随机密码',
    icon: Lock,
    path: '/tools/password',
  },
  {
    id: 'url-encoder',
    title: 'URL 编码/解码',
    description: 'URL 编码解码工具',
    icon: Link2,
    path: '/tools/url-encoder',
  },
  {
    id: 'base64',
    title: 'Base64 编码/解码',
    description: 'Base64 编码解码工具',
    icon: FileCode,
    path: '/tools/base64',
  },
];

export function ToolsPage() {
  const navigate = useNavigate();

  return (
    <div className="container max-w-screen-xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">工具集</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {TOOLS.map(({ id, title, description, icon: Icon, path }) => (
          <Card
            key={id}
            className="cursor-pointer hover:shadow-lg transition-shadow min-h-[120px] p-6"
            onClick={() => navigate(path)}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold leading-none tracking-tight text-lg">{title}</div>
                <div className="text-sm text-muted-foreground mt-1.5">{description}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
