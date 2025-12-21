import { useState, useMemo } from 'react';
import LZString from 'lz-string';
import { Copy, Check, Share2, Edit3, Eye } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToolLayout } from '@/components/tool-layout';
import { useClipboard, useIsMobile } from '@/hooks';

type ContentType = 'text' | 'html' | 'markdown';

export function ShareToolPage() {
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<ContentType>('text');
  const [isEditing, setIsEditing] = useState(true);
  const { copied, copy } = useClipboard();
  const isMobile = useIsMobile();

  const shareUrl = useMemo(() => {
    if (!content) return '';
    const compressed = LZString.compressToEncodedURIComponent(content);
    const url = new URL(window.location.origin + '/share');
    url.searchParams.set('content', compressed);
    url.searchParams.set('contentType', contentType);
    return url.toString();
  }, [content, contentType]);

  const handleShare = () => {
    if (!content) return;
    copy(shareUrl);
  };

  const renderContent = () => {
    switch (contentType) {
      case 'html':
        return (
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      case 'markdown':
        return (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        );
      default:
        return <pre className="whitespace-pre-wrap font-mono text-sm">{content}</pre>;
    }
  };

  const qrSize = isMobile ? Math.min(window.innerWidth - 80, 200) : 200;

  return (
    <ToolLayout title="分享工具" description="生成分享链接">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Tabs value={contentType} onValueChange={(v) => setContentType(v as ContentType)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text">纯文本</TabsTrigger>
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="ml-2"
          >
            {isEditing ? (
              <>
                <Eye className="h-4 w-4 mr-2" />
                预览
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4 mr-2" />
                编辑
              </>
            )}
          </Button>
        </div>

        <div>
          {isEditing ? (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="输入要分享的内容..."
              rows={10}
              className="font-mono"
            />
          ) : (
            <div className="min-h-[200px] p-4 border rounded-md bg-muted/30">
              {content ? renderContent() : <span className="text-muted-foreground">暂无内容</span>}
            </div>
          )}
        </div>

        {content && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={handleShare} className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                生成分享链接
              </Button>
              {shareUrl && (
                <Button variant="outline" onClick={() => copy(shareUrl)}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
            {shareUrl && (
              <>
                <div className="space-y-2">
                  <Label>分享链接</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm font-mono break-all">{shareUrl}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>二维码</Label>
                  <div className="flex justify-center p-4 bg-white rounded-md">
                    <QRCodeSVG value={shareUrl} size={qrSize} />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
