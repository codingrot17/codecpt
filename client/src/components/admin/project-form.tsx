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
import { Badge } from "@/components/ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, X } from "lucide-react";
import type { Project, InsertProject } from "@shared/schema";

interface ProjectFormProps {
  project?: Project;
  onClose?: () => void;
}

const projectCategories = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "desktop-application", label: "Desktop Application" },
  { value: "api-development", label: "API Development" },
  { value: "data-science", label: "Data Science" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "game-development", label: "Game Development" },
  { value: "other", label: "Other" },
];

export function ProjectForm({ project, onClose }: ProjectFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<InsertProject>({
    title: project?.title || "",
    description: project?.description || "",
    category: project?.category || "web-development",
    technologies: project?.technologies || [],
    features: project?.features || [],
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
    imageUrl: project?.imageUrl || "",
    featured: project?.featured || false,
  });

  const [newTechnology, setNewTechnology] = useState("");
  const [newFeature, setNewFeature] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: InsertProject) =>
      apiRequest("POST", "/api/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Success", description: "Project created successfully" });
      setOpen(false);
      if (onClose) onClose();
      setFormData({
        title: "",
        description: "",
        category: "web-development",
        technologies: [],
        features: [],
        liveUrl: "",
        githubUrl: "",
        imageUrl: "",
        featured: false,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: InsertProject) =>
      apiRequest("PUT", `/api/projects/${project?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Success", description: "Project updated successfully" });
      setOpen(false);
      if (onClose) onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const addTechnology = () => {
    if (
      newTechnology.trim() &&
      !formData.technologies.includes(newTechnology.trim())
    ) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology.trim()],
      });
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f !== feature),
    });
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {project ? (
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">
            {project ? "Edit Project" : "Add New Project"}
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
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Enter project title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Describe your project"
              rows={4}
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
                {projectCategories.map((category) => (
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
            <Label className="text-white">Technologies</Label>
            <div className="flex gap-2">
              <Input
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTechnology())
                }
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Add technology"
              />
              <Button
                type="button"
                onClick={addTechnology}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tech}
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeTechnology(tech)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Features</Label>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addFeature())
                }
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Add feature"
              />
              <Button
                type="button"
                onClick={addFeature}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.features.map((feature, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {feature}
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeFeature(feature)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="liveUrl" className="text-white">
                Live URL (optional)
              </Label>
              <Input
                id="liveUrl"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="githubUrl" className="text-white">
                GitHub URL (optional)
              </Label>
              <Input
                id="githubUrl"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="https://github.com/username/repo"
              />
            </div>
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
              Featured project
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
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? "Saving..." : project ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectFormTrigger() {
  return <ProjectForm />;
}
