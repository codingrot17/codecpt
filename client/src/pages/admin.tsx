import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  Edit,
  Plus,
  MessageSquare,
  FileText,
  Code,
  Folder,
  LogOut,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/auth/login-form";
import AuthProvider from "@/components/auth/auth-provider";
import { TechStackForm } from "@/components/admin/tech-stack-form";
import { BlogPostForm } from "@/components/admin/blog-post-form";
import { ProjectForm } from "@/components/admin/project-form";
import type {
  TechStack,
  BlogPost,
  Project,
  ContactMessage,
  InsertTechStack,
  InsertBlogPost,
  InsertProject,
} from "@shared/schema";

function AdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("dashboard");
  const { logout } = useAuth();

  // Fetch data for all sections
  const { data: techStacks = [] } = useQuery<TechStack[]>({
    queryKey: ["/api/tech-stacks"],
  });

  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: contactMessages = [] } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact-messages"],
  });

  // Delete mutations
  const deleteTechStackMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/tech-stacks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tech-stacks"] });
      toast({
        title: "Success",
        description: "Tech stack deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete tech stack",
        variant: "destructive",
      });
    },
  });

  const deleteBlogPostMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest("DELETE", `/api/blog-posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest("DELETE", `/api/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Success", description: "Project deleted successfully" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  const deleteContactMessageMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest("DELETE", `/api/contact-messages/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
      toast({ title: "Success", description: "Message deleted successfully" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-300">Manage your portfolio content</p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="tech-stacks"
              className="flex items-center gap-2"
            >
              <Code className="h-4 w-4" />
              Tech Stacks
            </TabsTrigger>
            <TabsTrigger value="blog-posts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Tech Stacks
                  </CardTitle>
                  <Code className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {techStacks.length}
                  </div>
                  <p className="text-xs text-gray-400">Total technologies</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Blog Posts
                  </CardTitle>
                  <FileText className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {blogPosts.length}
                  </div>
                  <p className="text-xs text-gray-400">Published articles</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Projects
                  </CardTitle>
                  <Folder className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {projects.length}
                  </div>
                  <p className="text-xs text-gray-400">Portfolio projects</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Messages
                  </CardTitle>
                  <MessageSquare className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {contactMessages.length}
                  </div>
                  <p className="text-xs text-gray-400">Contact messages</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Recent Blog Posts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-white">{post.title}</p>
                          <p className="text-sm text-gray-400">
                            {post.category}
                          </p>
                        </div>
                        <Badge
                          variant={post.featured ? "default" : "secondary"}
                        >
                          {post.featured ? "Featured" : "Regular"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.slice(0, 3).map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-white">
                            {project.title}
                          </p>
                          <p className="text-sm text-gray-400">
                            {project.category}
                          </p>
                        </div>
                        <Badge
                          variant={project.featured ? "default" : "secondary"}
                        >
                          {project.featured ? "Featured" : "Regular"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tech-stacks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Tech Stacks</h2>
              <TechStackForm />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStacks.map((tech) => (
                <Card key={tech.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <span className="text-2xl">{tech.icon}</span>
                      {tech.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-white">{tech.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${tech.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <Badge variant="secondary">{tech.category}</Badge>
                        <div className="flex gap-2">
                          <TechStackForm techStack={tech} />
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                            onClick={() =>
                              deleteTechStackMutation.mutate(tech.id)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blog-posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
              <BlogPostForm />
            </div>

            <div className="space-y-4">
              {blogPosts.map((post) => (
                <Card key={post.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">
                          {post.title}
                        </CardTitle>
                        <p className="text-gray-400 mt-1">{post.excerpt}</p>
                      </div>
                      <div className="flex gap-2">
                        <BlogPostForm blogPost={post} />
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                          onClick={() => deleteBlogPostMutation.mutate(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">{post.category}</Badge>
                      <Badge variant={post.featured ? "default" : "outline"}>
                        {post.featured ? "Featured" : "Regular"}
                      </Badge>
                      <span className="text-sm text-gray-400">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Projects</h2>
              <ProjectForm />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-slate-800 border-slate-700"
                >
                  <CardHeader>
                    <CardTitle className="text-white">
                      {project.title}
                    </CardTitle>
                    <p className="text-gray-400">{project.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary">{project.category}</Badge>
                        <div className="flex gap-2">
                          <ProjectForm project={project} />
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                            onClick={() =>
                              deleteProjectMutation.mutate(project.id)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Contact Messages
              </h2>
              <Badge variant="secondary">
                {contactMessages.length} messages
              </Badge>
            </div>

            <div className="space-y-4">
              {contactMessages.map((message) => (
                <Card
                  key={message.id}
                  className="bg-slate-800 border-slate-700"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">
                          {message.name}
                        </CardTitle>
                        <p className="text-gray-400">{message.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                          onClick={() =>
                            deleteContactMessageMutation.mutate(message.id)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-2">{message.message}</p>
                    <span className="text-sm text-gray-400">
                      {new Date(message.createdAt).toLocaleDateString()} at{" "}
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
}

function AdminContent() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    const success = await login(credentials);
    if (!success) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} isLoading={isLoading} />;
  }

  return <AdminDashboard />;
}
