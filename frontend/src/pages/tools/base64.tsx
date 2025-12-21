import { useState } from 'react';
import { Base64 } from 'js-base64';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ToolLayout } from '@/components/tool-layout';
import { useClipboard } from '@/hooks';

export function Base64Page() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { copied, copy } = useClipboard();

  const encode = () => {
    try {
      setOutput(Base64.encode(input));
    } catch (err) {
      setOutput(`编码失败: ${err}`);
    }
  };

  const decode = () => {
    try {
      setOutput(Base64.decode(input));
    } catch (err) {
      setOutput(`解码失败: ${err}`);
    }
  };

  return (
    <ToolLayout title="Base64 编码/解码" description="Base64 编码解码工具">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>输入</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入需要编码/解码的内容..."
            rows={5}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={encode}>
            Base64 编码
          </Button>
          <Button variant="secondary" onClick={decode}>
            Base64 解码
          </Button>
        </div>
        {output && (
          <div className="space-y-2">
            <Label>输出</Label>
            <div className="flex gap-2">
              <Textarea value={output} readOnly rows={5} className="font-mono" />
              <Button variant="outline" onClick={() => copy(output)} className="shrink-0">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
