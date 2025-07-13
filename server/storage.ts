import { 
  users, 
  contactMessages, 
  blogPosts, 
  projects,
  techStacks,
  type User, 
  type InsertUser,
  type ContactMessage,
  type InsertContactMessage,
  type BlogPost,
  type InsertBlogPost,
  type Project,
  type InsertProject,
  type TechStack,
  type InsertTechStack
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  deleteContactMessage(id: number): Promise<void>;
  
  // Blog posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  
  // Tech stacks
  getTechStacks(): Promise<TechStack[]>;
  getTechStack(id: number): Promise<TechStack | undefined>;
  createTechStack(techStack: InsertTechStack): Promise<TechStack>;
  updateTechStack(id: number, techStack: Partial<InsertTechStack>): Promise<TechStack>;
  deleteTechStack(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private blogPosts: Map<number, BlogPost>;
  private projects: Map<number, Project>;
  private techStacks: Map<number, TechStack>;
  private currentUserId: number;
  private currentMessageId: number;
  private currentBlogId: number;
  private currentProjectId: number;
  private currentTechStackId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.blogPosts = new Map();
    this.projects = new Map();
    this.techStacks = new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
    this.currentBlogId = 1;
    this.currentProjectId = 1;
    this.currentTechStackId = 1;
    
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Initialize sample tech stacks
    const sampleTechStacks: TechStack[] = [
      { id: 1, name: "React", icon: "⚛️", progress: 95, category: "frontend", color: "bg-blue-500/20", createdAt: new Date() },
      { id: 2, name: "Next.js", icon: "▲", progress: 90, category: "frontend", color: "bg-gray-500/20", createdAt: new Date() },
      { id: 3, name: "JavaScript", icon: "🟨", progress: 92, category: "frontend", color: "bg-yellow-500/20", createdAt: new Date() },
      { id: 4, name: "CSS/Tailwind", icon: "🎨", progress: 95, category: "frontend", color: "bg-blue-500/20", createdAt: new Date() },
      { id: 5, name: "Node.js", icon: "🟢", progress: 88, category: "backend", color: "bg-green-500/20", createdAt: new Date() },
      { id: 6, name: "Laravel", icon: "🔴", progress: 85, category: "backend", color: "bg-red-500/20", createdAt: new Date() },
      { id: 7, name: "PHP", icon: "🟣", progress: 85, category: "backend", color: "bg-purple-500/20", createdAt: new Date() },
      { id: 8, name: "Express.js", icon: "🚀", progress: 87, category: "backend", color: "bg-green-500/20", createdAt: new Date() },
      { id: 9, name: "MongoDB", icon: "🍃", progress: 80, category: "database", color: "bg-green-500/20", createdAt: new Date() },
      { id: 10, name: "MySQL", icon: "🐬", progress: 83, category: "database", color: "bg-orange-500/20", createdAt: new Date() },
      { id: 11, name: "Git", icon: "📦", progress: 90, category: "tools", color: "bg-orange-500/20", createdAt: new Date() },
      { id: 12, name: "Mobile Dev", icon: "📱", progress: 85, category: "mobile", color: "bg-green-500/20", createdAt: new Date() },
    ];

    // Initialize sample blog posts
    const sampleBlogPosts: BlogPost[] = [
      {
        id: 1,
        title: "Mobile Development with Acode and Termux",
        slug: "mobile-development-acode-termux",
        excerpt: "Discover how to set up a complete mobile development environment using Acode editor and Termux terminal for on-the-go coding.",
        content: "Full content for mobile development post...",
        category: "Mobile Development",
        publishedAt: new Date("2023-12-15"),
        featured: true,
      },
      {
        id: 2,
        title: "Advanced React Patterns and Best Practices",
        slug: "advanced-react-patterns",
        excerpt: "Explore advanced React patterns, hooks, and performance optimization techniques for building scalable applications.",
        content: "Full content for React patterns post...",
        category: "React",
        publishedAt: new Date("2023-12-10"),
        featured: false,
      },
      {
        id: 3,
        title: "Building RESTful APIs with Node.js and Express",
        slug: "restful-apis-nodejs-express",
        excerpt: "Learn how to create robust, scalable RESTful APIs using Node.js, Express, and modern database technologies.",
        content: "Full content for API development post...",
        category: "Backend",
        publishedAt: new Date("2023-12-05"),
        featured: false,
      },
    ];

    // Initialize sample projects
    const sampleProjects: Project[] = [
      {
        id: 1,
        title: "E-Commerce Platform",
        description: "A comprehensive e-commerce solution built with React and Laravel, featuring payment integration, inventory management, and responsive design.",
        category: "fullstack",
        technologies: ["React", "Laravel", "MySQL", "Stripe API", "Tailwind CSS"],
        features: [
          "User authentication and authorization",
          "Product catalog with search and filtering",
          "Shopping cart and checkout process",
          "Payment integration with Stripe",
          "Admin dashboard for inventory management",
          "Order tracking and management",
          "Responsive design for all devices"
        ],
        liveUrl: "https://ecommerce-demo.com",
        githubUrl: "https://github.com/codecpt/ecommerce-platform",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        featured: true,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "Task Management App",
        description: "Modern task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
        category: "frontend",
        technologies: ["Next.js", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
        features: [
          "Drag-and-drop task boards",
          "Real-time collaboration",
          "Team member management",
          "Due date tracking and notifications",
          "Progress tracking and analytics",
          "File attachments and comments",
          "Mobile-responsive interface"
        ],
        liveUrl: "https://taskapp-demo.com",
        githubUrl: "https://github.com/codecpt/task-management",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        featured: false,
        createdAt: new Date(),
      },
      {
        id: 3,
        title: "Mobile Weather App",
        description: "Cross-platform mobile weather application with location services, forecasts, and beautiful animations.",
        category: "mobile",
        technologies: ["React Native", "Weather API", "AsyncStorage", "Lottie Animations"],
        features: [
          "Current weather conditions",
          "7-day weather forecast",
          "Location-based weather data",
          "Beautiful weather animations",
          "Offline data caching",
          "Dark and light theme support",
          "Push notifications for weather alerts"
        ],
        liveUrl: "https://play.google.com/store/apps/details?id=com.codecpt.weather",
        githubUrl: "https://github.com/codecpt/weather-app",
        imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        featured: false,
        createdAt: new Date(),
      },
    ];

    sampleTechStacks.forEach(techStack => {
      this.techStacks.set(techStack.id, techStack);
      this.currentTechStackId = Math.max(this.currentTechStackId, techStack.id + 1);
    });

    sampleBlogPosts.forEach(post => {
      this.blogPosts.set(post.id, post);
      this.currentBlogId = Math.max(this.currentBlogId, post.id + 1);
    });

    sampleProjects.forEach(project => {
      this.projects.set(project.id, project);
      this.currentProjectId = Math.max(this.currentProjectId, project.id + 1);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      role: insertUser.role || "user"
    };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
      read: false,
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async deleteContactMessage(id: number): Promise<void> {
    this.contactMessages.delete(id);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogId++;
    const post: BlogPost = {
      ...insertPost,
      id,
      publishedAt: new Date(),
      featured: insertPost.featured || false,
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) {
      throw new Error(`Blog post with id ${id} not found`);
    }
    const updatedPost: BlogPost = { ...existingPost, ...updateData };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<void> {
    this.blogPosts.delete(id);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date(),
      featured: insertProject.featured || false,
      liveUrl: insertProject.liveUrl || null,
      githubUrl: insertProject.githubUrl || null,
      imageUrl: insertProject.imageUrl || null,
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updateData: Partial<InsertProject>): Promise<Project> {
    const existingProject = this.projects.get(id);
    if (!existingProject) {
      throw new Error(`Project with id ${id} not found`);
    }
    const updatedProject: Project = { ...existingProject, ...updateData };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    this.projects.delete(id);
  }

  // Tech Stack operations
  async getTechStacks(): Promise<TechStack[]> {
    return Array.from(this.techStacks.values()).sort(
      (a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
    );
  }

  async getTechStack(id: number): Promise<TechStack | undefined> {
    return this.techStacks.get(id);
  }

  async createTechStack(insertTechStack: InsertTechStack): Promise<TechStack> {
    const id = this.currentTechStackId++;
    const techStack: TechStack = {
      ...insertTechStack,
      id,
      createdAt: new Date(),
    };
    this.techStacks.set(id, techStack);
    return techStack;
  }

  async updateTechStack(id: number, updateData: Partial<InsertTechStack>): Promise<TechStack> {
    const existingTechStack = this.techStacks.get(id);
    if (!existingTechStack) {
      throw new Error(`Tech stack with id ${id} not found`);
    }
    const updatedTechStack: TechStack = { ...existingTechStack, ...updateData };
    this.techStacks.set(id, updatedTechStack);
    return updatedTechStack;
  }

  async deleteTechStack(id: number): Promise<void> {
    this.techStacks.delete(id);
  }
}

export const storage = new MemStorage();
