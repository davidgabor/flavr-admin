import { useState, useEffect } from "react";
import { useData } from "@/contexts/DataContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { RichTextEditor } from "./blog-form/RichTextEditor";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogPostFormData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  published_at?: string;
  author_id?: string;
}

interface EditBlogPostDialogProps {
  post?: any;
  isNew?: boolean;
  onClose?: () => void;
}

export const EditBlogPostDialog = ({ post, isNew, onClose }: EditBlogPostDialogProps) => {
  const { refreshData, people } = useData();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: post?.title || "",
    slug: post?.slug || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    cover_image: post?.cover_image || "",
    published_at: post?.published_at || "",
    author_id: post?.author_id || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        const { error } = await supabase
          .from("blog_posts")
          .insert({ ...formData });
        
        if (error) throw error;
        toast.success("Blog post created successfully");
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .update(formData)
          .eq("id", post.id);
        
        if (error) throw error;
        toast.success("Blog post updated successfully");
      }
      
      refreshData();
      handleClose();
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast.error(isNew ? "Failed to create blog post" : "Failed to update blog post");
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  useEffect(() => {
    setOpen(isNew || false);
  }, [isNew]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isNew && (
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 transition-opacity group-hover:opacity-100 text-white hover:bg-white/10"
          onClick={() => setOpen(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
      <DialogContent className="bg-dashboard-background border-dashboard-accent/20 text-white max-w-[90vw] w-[1200px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isNew ? "Create Blog Post" : "Edit Blog Post"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh]">
          <form onSubmit={handleSubmit} className="mt-4 space-y-6 pr-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">Title</Label>
                <Input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">Slug</Label>
                <Input
                  placeholder="slug-for-url"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Author</Label>
              <Select
                value={formData.author_id}
                onValueChange={(value) => setFormData({ ...formData, author_id: value })}
              >
                <SelectTrigger className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors">
                  <SelectValue placeholder="Select an author" />
                </SelectTrigger>
                <SelectContent className="bg-dashboard-card border-white/10">
                  {people.map((person) => (
                    <SelectItem key={person.id} value={person.id} className="text-white">
                      {person.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Content</Label>
              <RichTextEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Excerpt</Label>
              <Textarea
                placeholder="Excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">Cover Image URL</Label>
                <Input
                  placeholder="Cover Image URL"
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">Publish Date</Label>
                <Input
                  type="datetime-local"
                  value={formData.published_at ? new Date(formData.published_at).toISOString().slice(0, 16) : ""}
                  onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                  className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-dashboard-accent hover:bg-dashboard-accent/90 transition-colors">
              {isNew ? "Create Blog Post" : "Update Blog Post"}
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};