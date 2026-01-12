import "dotenv/config";
import { db } from "./db";
import { techStacks, blogPosts, projects } from "@shared/schema";

async function seed() {
    console.log("🌱 Seeding database...");

    try {
        // Clear existing data
        console.log("Clearing existing data...");
        await db.delete(techStacks);
        await db.delete(blogPosts);
        await db.delete(projects);

        // Seed Tech Stacks
        console.log("Seeding tech stacks...");
        await db.insert(techStacks).values([
            {
                name: "React",
                icon: "⚛️",
                progress: 95,
                category: "frontend",
                color: "bg-blue-500/20"
            },
            {
                name: "Next.js",
                icon: "▲",
                progress: 90,
                category: "frontend",
                color: "bg-gray-500/20"
            },
            {
                name: "JavaScript",
                icon: "🟨",
                progress: 92,
                category: "frontend",
                color: "bg-yellow-500/20"
            },
            {
                name: "CSS/Tailwind",
                icon: "🎨",
                progress: 95,
                category: "frontend",
                color: "bg-blue-500/20"
            },
            {
                name: "Node.js",
                icon: "🟢",
                progress: 88,
                category: "backend",
                color: "bg-green-500/20"
            },
            {
                name: "Laravel",
                icon: "🔴",
                progress: 85,
                category: "backend",
                color: "bg-red-500/20"
            },
            {
                name: "PHP",
                icon: "🟣",
                progress: 85,
                category: "backend",
                color: "bg-purple-500/20"
            },
            {
                name: "Express.js",
                icon: "🚀",
                progress: 87,
                category: "backend",
                color: "bg-green-500/20"
            },
            {
                name: "MongoDB",
                icon: "🍃",
                progress: 80,
                category: "database",
                color: "bg-green-500/20"
            },
            {
                name: "MySQL",
                icon: "🐬",
                progress: 83,
                category: "database",
                color: "bg-orange-500/20"
            },
            {
                name: "Git",
                icon: "📦",
                progress: 90,
                category: "tools",
                color: "bg-orange-500/20"
            },
            {
                name: "Mobile Dev",
                icon: "📱",
                progress: 85,
                category: "mobile",
                color: "bg-green-500/20"
            }
        ]);

        // Seed Blog Posts
        console.log("Seeding blog posts...");
        await db.insert(blogPosts).values([
            {
                title: "Mobile Development with Acode and Termux",
                slug: "mobile-development-acode-termux",
                excerpt:
                    "Discover how to set up a complete mobile development environment using Acode editor and Termux terminal for on-the-go coding.",
                content: `# Mobile Development with Acode and Termux

Mobile development doesn't always require a desktop computer. With the right tools, you can turn your Android device into a powerful development machine.

## Getting Started with Acode

Acode is a lightweight yet powerful code editor for Android that supports syntax highlighting, plugins, and Git integration.

## Setting Up Termux

Termux provides a Linux environment on Android, allowing you to run Node.js, Python, and other development tools directly on your device.

## Best Practices

1. Use cloud storage for backups
2. Install essential packages via pkg manager
3. Configure SSH for remote development
4. Use tmux for session management

With these tools, you can code anywhere, anytime!`,
                category: "mobile-development",
                featured: true
            },
            {
                title: "Advanced React Patterns and Best Practices",
                slug: "advanced-react-patterns",
                excerpt:
                    "Explore advanced React patterns, hooks, and performance optimization techniques for building scalable applications.",
                content: `# Advanced React Patterns

Modern React development requires understanding advanced patterns and optimization techniques.

## Custom Hooks

Creating reusable logic with custom hooks improves code organization and reusability.

## Performance Optimization

- Use React.memo for component memoization
- Implement useCallback and useMemo strategically
- Code splitting with React.lazy

## State Management

Choose the right state management solution for your app's complexity.`,
                category: "web-development",
                featured: false
            },
            {
                title: "Building RESTful APIs with Node.js and Express",
                slug: "restful-apis-nodejs-express",
                excerpt:
                    "Learn how to create robust, scalable RESTful APIs using Node.js, Express, and modern database technologies.",
                content: `# Building RESTful APIs

Creating well-structured APIs is crucial for modern web applications.

## API Design Principles

- Use proper HTTP methods
- Implement versioning
- Add authentication and authorization
- Handle errors gracefully

## Database Integration

Connect your API to PostgreSQL, MongoDB, or other databases using ORMs like Drizzle or Prisma.`,
                category: "programming",
                featured: false
            }
        ]);

        // Seed Projects
        console.log("Seeding projects...");
        await db.insert(projects).values([
            {
                title: "E-Commerce Platform",
                description:
                    "A comprehensive e-commerce solution built with React and Laravel, featuring payment integration, inventory management, and responsive design.",
                category: "web-development",
                technologies: [
                    "React",
                    "Laravel",
                    "MySQL",
                    "Stripe API",
                    "Tailwind CSS"
                ],
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
                imageUrl:
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
                featured: true
            },
            {
                title: "Task Management App",
                description:
                    "Modern task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
                category: "web-development",
                technologies: [
                    "Next.js",
                    "Node.js",
                    "MongoDB",
                    "Socket.io",
                    "Tailwind CSS"
                ],
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
                imageUrl:
                    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
                featured: false
            },
            {
                title: "Mobile Weather App",
                description:
                    "Cross-platform mobile weather application with location services, forecasts, and beautiful animations.",
                category: "mobile-development",
                technologies: [
                    "React Native",
                    "Weather API",
                    "AsyncStorage",
                    "Lottie Animations"
                ],
                features: [
                    "Current weather conditions",
                    "7-day weather forecast",
                    "Location-based weather data",
                    "Beautiful weather animations",
                    "Offline data caching",
                    "Dark and light theme support",
                    "Push notifications for weather alerts"
                ],
                githubUrl: "https://github.com/codecpt/weather-app",
                imageUrl:
                    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
                featured: false
            }
        ]);

        console.log("✅ Database seeded successfully!");
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        throw error;
    } finally {
        process.exit(0);
    }
}

seed();
