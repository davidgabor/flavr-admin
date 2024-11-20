import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { EditBlogPostDialog } from "../EditBlogPostDialog";

interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    excerpt?: string;
    cover_image?: string;
    published_at?: string;
  };
  onDelete: (id: string) => void;
}

export const BlogPostCard = ({ post, onDelete }: BlogPostCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-dashboard-card border-white/5 hover:border-dashboard-accent/50 transition-all duration-300">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-md"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-white">{post.title}</h3>
            {post.excerpt && (
              <p className="mt-1 text-sm text-dashboard-muted line-clamp-2">
                {post.excerpt}
              </p>
            )}
            {post.published_at && (
              <p className="mt-2 text-xs text-dashboard-muted">
                Published: {new Date(post.published_at).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <EditBlogPostDialog post={post} />
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/10 text-white"
          onClick={() => onDelete(post.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};