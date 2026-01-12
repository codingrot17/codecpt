import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authRouter, requireAuth } from "./auth";
import {
    insertContactMessageSchema,
    insertBlogPostSchema,
    insertProjectSchema,
    insertTechStackSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
    // Auth routes (public)
    app.use("/api/auth", authRouter);

    // ===== PUBLIC ROUTES (No Auth Required) =====

    // Get all blog posts
    app.get("/api/blog-posts", async (req, res) => {
        try {
            const posts = await storage.getBlogPosts();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch blog posts" });
        }
    });

    // Get single blog post by slug
    app.get("/api/blog-posts/:slug", async (req, res) => {
        try {
            const { slug } = req.params;
            const post = await storage.getBlogPost(slug);
            if (!post) {
                return res.status(404).json({ message: "Blog post not found" });
            }
            res.json(post);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch blog post" });
        }
    });

    // Get all projects
    app.get("/api/projects", async (req, res) => {
        try {
            const projects = await storage.getProjects();
            res.json(projects);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch projects" });
        }
    });

    // Get single project
    app.get("/api/projects/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid project ID" });
            }
            const project = await storage.getProject(id);
            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }
            res.json(project);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch project" });
        }
    });

    // Get all tech stacks
    app.get("/api/tech-stacks", async (req, res) => {
        try {
            const techStacks = await storage.getTechStacks();
            res.json(techStacks);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch tech stacks" });
        }
    });

    // Create contact message (public)
    app.post("/api/contact", async (req, res) => {
        try {
            const validatedData = insertContactMessageSchema.parse(req.body);
            const message = await storage.createContactMessage(validatedData);
            res.status(201).json({
                message: "Message sent successfully",
                data: message
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Invalid input",
                    errors: error.errors
                });
            }
            res.status(500).json({ message: "Failed to send message" });
        }
    });

    // ===== PROTECTED ADMIN ROUTES =====

    // Get all contact messages (admin only)
    app.get("/api/contact-messages", requireAuth, async (req, res) => {
        try {
            const messages = await storage.getContactMessages();
            res.json(messages);
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch contact messages"
            });
        }
    });

    // Delete contact message (admin only)
    app.delete("/api/contact-messages/:id", requireAuth, async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid message ID" });
            }
            await storage.deleteContactMessage(id);
            res.json({ message: "Message deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete message" });
        }
    });

    // Create blog post (admin only)
    app.post("/api/blog-posts", requireAuth, async (req, res) => {
        try {
            const validatedData = insertBlogPostSchema.parse(req.body);
            const blogPost = await storage.createBlogPost(validatedData);
            res.status(201).json(blogPost);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res
                    .status(400)
                    .json({ message: "Invalid input", errors: error.errors });
            }
            res.status(500).json({ message: "Failed to create blog post" });
        }
    });

    // Update blog post (admin only)
    app.put("/api/blog-posts/:id", requireAuth, async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res
                    .status(400)
                    .json({ message: "Invalid blog post ID" });
            }
            const validatedData = insertBlogPostSchema
                .partial()
                .parse(req.body);
            const blogPost = await storage.updateBlogPost(id, validatedData);
            res.json(blogPost);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res
                    .status(400)
                    .json({ message: "Invalid input", errors: error.errors });
            }
            res.status(500).json({ message: "Failed to update blog post" });
        }
    });

    // Delete blog post (admin only)
    app.delete("/api/blog-posts/:id", requireAuth, async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res
                    .status(400)
                    .json({ message: "Invalid blog post ID" });
            }
            await storage.deleteBlogPost(id);
            res.json({ message: "Blog post deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete blog post" });
        }
    });

    // Project CRUD (admin only)
    app.post("/api/projects", requireAuth, async (req, res) => {
        try {
            const validatedData = insertProjectSchema.parse(req.body);
            const project = await storage.createProject(validatedData);
            res.status(201).json(project);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res
                    .status(400)
                    .json({ message: "Invalid input", errors: error.errors });
            }
            res.status(500).json({ message: "Failed to create project" });
        }
    });

    app.put("/api/projects/:id", requireAuth, async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid project ID" });
            }
            const validatedData = insertProjectSchema.partial().parse(req.body);
            const project = await storage.updateProject(id, validatedData);
            res.json(project);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res
                    .status(400)
                    .json({ message: "Invalid input", errors: error.errors });
            }
            res.status(500).json({ message: "Failed to update project" });
        }
    });

    app.delete("/api/projects/:id", requireAuth, async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid project ID" });
            }
            await storage.deleteProject(id);
            res.json({ message: "Project deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete project" });
        }
    });

    // Tech Stack CRUD (admin only)
    app.post("/api/tech-stacks", requireAuth, async (req, res) => {
        try {
            const validatedData = insertTechStackSchema.parse(req.body);
            const techStack = await storage.createTechStack(validatedData);
            res.status(201).json(techStack);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res
                    .status(400)
                    .json({ message: "Invalid input", errors: error.errors });
            }
            res.status(500).json({ message: "Failed to create tech stack" });
        }
    });

    app.put("/api/tech-stacks/:id", requireAuth, async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res
                    .status(400)
                    .json({ message: "Invalid tech stack ID" });
            }
            const validatedData = insertTechStackSchema
                .partial()
                .parse(req.body);
            const techStack = await storage.updateTechStack(id, validatedData);
            res.json(techStack);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res
                    .status(400)
                    .json({ message: "Invalid input", errors: error.errors });
            }
            res.status(500).json({ message: "Failed to update tech stack" });
        }
    });

    app.delete("/api/tech-stacks/:id", requireAuth, async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res
                    .status(400)
                    .json({ message: "Invalid tech stack ID" });
            }
            await storage.deleteTechStack(id);
            res.json({ message: "Tech stack deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete tech stack" });
        }
    });

    const httpServer = createServer(app);
    return httpServer;
}
