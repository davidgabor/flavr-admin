import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, Image as ImageIcon, Quote, BookMarked } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const { recommendations } = useData();
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const insertRecommendation = (recommendation: any) => {
    editor
      .chain()
      .focus()
      .insertContent(`
        <div class="recommendation-card p-4 my-4 bg-gray-100 rounded-lg">
          <h3 class="font-bold">${recommendation.name}</h3>
          <p class="text-sm text-gray-600">${recommendation.type} • ${recommendation.price_level} • Rating: ${recommendation.rating}</p>
          ${recommendation.description ? `<p class="mt-2">${recommendation.description}</p>` : ''}
        </div>
      `)
      .run();
  };

  return (
    <div className="border border-white/10 rounded-md overflow-hidden">
      <div className="bg-dashboard-card p-2 border-b border-white/10 flex gap-2 flex-wrap">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-white/10' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-white/10' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-white/10' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-white/10' : ''}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={addImage}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              <BookMarked className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 bg-dashboard-card border-dashboard-accent/20">
            <ScrollArea className="h-[300px]">
              <div className="p-4 space-y-2">
                <h4 className="font-medium text-sm text-white mb-4">Insert Recommendation</h4>
                {recommendations.map((rec) => (
                  <Button
                    key={rec.id}
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => insertRecommendation(rec)}
                  >
                    <div>
                      <div className="font-medium">{rec.name}</div>
                      <div className="text-xs text-gray-400">{rec.type} • {rec.price_level}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
      <EditorContent 
        editor={editor} 
        className="prose prose-invert max-w-none p-4 min-h-[300px] bg-dashboard-card focus:outline-none"
      />
    </div>
  );
};