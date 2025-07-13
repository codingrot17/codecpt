import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit } from "lucide-react";
import type { BlogPost, InsertBlogPost } from "@shared/schema";

interface BlogPostFormProps {
  blogPost?: BlogPost;
  onClose?: () => void;
}

const blogCategories = [
  { value: "technology", label: "Technology" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "programming", label: "Programming" },
  { value: "tutorial", label: "Tutorial" },
  { value: "opinion", label: "Opinion" },
  { value: "news", label: "News" },
];

export function BlogPostForm({ blogPost, onClose }: BlogPostFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<InsertBlogPost>({
    title: blogPost?.title || "",
    slug: blogPost?.slug || "",
    excerpt: blogPost?.excerpt || "",
    content: blogPost?.content || "",
    category: blogPost?.category || "technology",
    imageUrl: blogPost?.imageUrl || "",
    featured: blogPost?.featured || false,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: InsertBlogPost) =>
      apiRequest("POST", `/api/blog-posts`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      setOpen(false);
      if (onClose) onClose();
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "technology",
        imageUrl: "",
        featured: false,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: InsertBlogPost) =>
      apiRequest("PUT", `/api/blog-posts/${blogPost?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      setOpen(false);
      if (onClose) onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (blogPost) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {blogPost ? (
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Blog Post
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">
            {blogPost ? "Edit Blog Post" : "Add New Blog Post"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Enter blog post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="text-white">
              Slug
            </Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="url-friendly-slug"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" className="text-white">
              Excerpt
            </Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Brief description of the blog post"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-white">
              Content
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Full blog post content"
              rows={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-white">
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {blogCategories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="text-white"
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-white">
              Image URL (optional)
            </Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, featured: checked as boolean })
              }
            />
            <Label htmlFor="featured" className="text-white">
              Featured post
            </Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="border-slate-600 text-white hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? "Saving..." : blogPost ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function BlogPostFormTrigger() {
  return <BlogPostForm />;
}
