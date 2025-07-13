import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit } from "lucide-react";
import type { TechStack, InsertTechStack } from "@shared/schema";

interface TechStackFormProps {
  techStack?: TechStack;
  onClose?: () => void;
}

const techCategories = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "database", label: "Database" },
  { value: "mobile", label: "Mobile" },
  { value: "tools", label: "Tools" },
  { value: "devops", label: "DevOps" },
];

const colorOptions = [
  { value: "bg-blue-500/20", label: "Blue", color: "bg-blue-500" },
  { value: "bg-green-500/20", label: "Green", color: "bg-green-500" },
  { value: "bg-purple-500/20", label: "Purple", color: "bg-purple-500" },
  { value: "bg-red-500/20", label: "Red", color: "bg-red-500" },
  { value: "bg-yellow-500/20", label: "Yellow", color: "bg-yellow-500" },
  { value: "bg-orange-500/20", label: "Orange", color: "bg-orange-500" },
  { value: "bg-pink-500/20", label: "Pink", color: "bg-pink-500" },
  { value: "bg-gray-500/20", label: "Gray", color: "bg-gray-500" },
];

export function TechStackForm({ techStack, onClose }: TechStackFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<InsertTechStack>({
    name: techStack?.name || "",
    icon: techStack?.icon || "",
    progress: techStack?.progress || 50,
    category: techStack?.category || "frontend",
    color: techStack?.color || "bg-blue-500/20",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: InsertTechStack) => apiRequest("/api/tech-stacks", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tech-stacks"] });
      toast({ title: "Success", description: "Tech stack created successfully" });
      setOpen(false);
      if (onClose) onClose();
      setFormData({ name: "", icon: "", progress: 50, category: "frontend", color: "bg-blue-500/20" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create tech stack", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: InsertTechStack) => apiRequest(`/api/tech-stacks/${techStack?.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tech-stacks"] });
      toast({ title: "Success", description: "Tech stack updated successfully" });
      setOpen(false);
      if (onClose) onClose();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update tech stack", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (techStack) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {techStack ? (
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Tech Stack
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">
            {techStack ? "Edit Tech Stack" : "Add New Tech Stack"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="e.g., React, Node.js"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon" className="text-white">Icon (Emoji)</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="e.g., ⚛️, 🟢, 🔴"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-white">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {techCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value} className="text-white">
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color" className="text-white">Color</Label>
            <Select
              value={formData.color}
              onValueChange={(value) => setFormData({ ...formData, color: value })}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value} className="text-white">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${color.color}`} />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="progress" className="text-white">
              Progress: {formData.progress}%
            </Label>
            <Slider
              value={[formData.progress]}
              onValueChange={(value) => setFormData({ ...formData, progress: value[0] })}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
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
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Saving..." : (techStack ? "Update" : "Create")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function TechStackFormTrigger() {
  return <TechStackForm />;
}