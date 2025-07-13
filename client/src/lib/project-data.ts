// Project-related utilities and constants

export const projectCategories = [
  { id: "all", label: "All Projects", color: "bg-blue-500" },
  { id: "frontend", label: "Frontend", color: "bg-blue-500" },
  { id: "fullstack", label: "Full-Stack", color: "bg-purple-500" },
  { id: "mobile", label: "Mobile", color: "bg-green-500" },
] as const;

export const techColorMap: Record<string, string> = {
  // Frontend
  React: "bg-blue-500/20 text-blue-400",
  "Next.js": "bg-gray-500/20 text-gray-400",
  "Vue.js": "bg-green-500/20 text-green-400",
  JavaScript: "bg-yellow-500/20 text-yellow-400",
  TypeScript: "bg-blue-600/20 text-blue-500",
  "Tailwind CSS": "bg-cyan-500/20 text-cyan-400",
  
  // Backend
  "Node.js": "bg-green-500/20 text-green-400",
  "Express.js": "bg-gray-500/20 text-gray-400",
  Laravel: "bg-red-500/20 text-red-400",
  PHP: "bg-purple-500/20 text-purple-400",
  
  // Database
  MongoDB: "bg-green-500/20 text-green-400",
  MySQL: "bg-orange-500/20 text-orange-400",
  PostgreSQL: "bg-blue-500/20 text-blue-400",
  
  // Mobile
  "React Native": "bg-blue-500/20 text-blue-400",
  
  // APIs & Services
  "Stripe API": "bg-purple-500/20 text-purple-400",
  "Weather API": "bg-blue-500/20 text-blue-400",
  "Socket.io": "bg-green-500/20 text-green-400",
  
  // Tools
  "D3.js": "bg-orange-500/20 text-orange-400",
  "Chart.js": "bg-pink-500/20 text-pink-400",
  "Lottie Animations": "bg-purple-500/20 text-purple-400",
  Redis: "bg-red-500/20 text-red-400",
  Elasticsearch: "bg-yellow-500/20 text-yellow-400",
  JWT: "bg-green-500/20 text-green-400",
  AsyncStorage: "bg-blue-500/20 text-blue-400",
  
  // Default fallback
  default: "bg-gray-500/20 text-gray-400",
};

export const getTechColor = (tech: string): string => {
  return techColorMap[tech] || techColorMap.default;
};

export const getCategoryColor = (category: string): string => {
  const categoryMap: Record<string, string> = {
    frontend: "border-blue-500 text-blue-400",
    fullstack: "border-purple-500 text-purple-400",
    mobile: "border-green-500 text-green-400",
  };
  return categoryMap[category] || "border-gray-500 text-gray-400";
};

export const getProjectImageFallback = (category: string): string => {
  const fallbackImages: Record<string, string> = {
    frontend: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    fullstack: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    mobile: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
  };
  return fallbackImages[category] || fallbackImages.fullstack;
};

export const formatProjectDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const validateProjectUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getProjectStats = (projects: any[]): {
  totalProjects: number;
  categoryCounts: Record<string, number>;
  techCounts: Record<string, number>;
} => {
  const categoryCounts: Record<string, number> = {};
  const techCounts: Record<string, number> = {};

  projects.forEach(project => {
    // Count categories
    categoryCounts[project.category] = (categoryCounts[project.category] || 0) + 1;
    
    // Count technologies
    project.technologies.forEach((tech: string) => {
      techCounts[tech] = (techCounts[tech] || 0) + 1;
    });
  });

  return {
    totalProjects: projects.length,
    categoryCounts,
    techCounts,
  };
};

export const sortProjectsByDate = (projects: any[]): any[] => {
  return [...projects].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const filterProjectsByCategory = (projects: any[], category: string): any[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export const searchProjects = (projects: any[], query: string): any[] => {
  if (!query.trim()) return projects;
  
  const searchTerm = query.toLowerCase();
  return projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm) ||
    project.description.toLowerCase().includes(searchTerm) ||
    project.technologies.some((tech: string) => tech.toLowerCase().includes(searchTerm))
  );
};
