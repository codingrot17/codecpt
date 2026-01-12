import { eq, desc } from "drizzle-orm";
import { db } from "./db";
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
    createContactMessage(
        message: InsertContactMessage
    ): Promise<ContactMessage>;
    getContactMessages(): Promise<ContactMessage[]>;
    deleteContactMessage(id: number): Promise<void>;

    // Blog posts
    getBlogPosts(): Promise<BlogPost[]>;
    getBlogPost(slug: string): Promise<BlogPost | undefined>;
    createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
    updateBlogPost(
        id: number,
        post: Partial<InsertBlogPost>
    ): Promise<BlogPost>;
    deleteBlogPost(id: number): Promise<void>;

    // Projects
    getProjects(): Promise<Project[]>;
    getProject(id: number): Promise<Project | undefined>;
    createProject(project: InsertProject): Promise<Project>;
    updateProject(
        id: number,
        project: Partial<InsertProject>
    ): Promise<Project>;
    deleteProject(id: number): Promise<void>;

    // Tech stacks
    getTechStacks(): Promise<TechStack[]>;
    getTechStack(id: number): Promise<TechStack | undefined>;
    createTechStack(techStack: InsertTechStack): Promise<TechStack>;
    updateTechStack(
        id: number,
        techStack: Partial<InsertTechStack>
    ): Promise<TechStack>;
    deleteTechStack(id: number): Promise<void>;
}

export class DbStorage implements IStorage {
    // ===== USER OPERATIONS =====
    async getUser(id: number): Promise<User | undefined> {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user;
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.username, username));
        return user;
    }

    async createUser(insertUser: InsertUser): Promise<User> {
        const [user] = await db.insert(users).values(insertUser).returning();
        return user;
    }

    // ===== CONTACT MESSAGE OPERATIONS =====
    async createContactMessage(
        insertMessage: InsertContactMessage
    ): Promise<ContactMessage> {
        const [message] = await db
            .insert(contactMessages)
            .values(insertMessage)
            .returning();
        return message;
    }

    async getContactMessages(): Promise<ContactMessage[]> {
        return await db
            .select()
            .from(contactMessages)
            .orderBy(desc(contactMessages.createdAt));
    }

    async deleteContactMessage(id: number): Promise<void> {
        await db.delete(contactMessages).where(eq(contactMessages.id, id));
    }

    // ===== BLOG POST OPERATIONS =====
    async getBlogPosts(): Promise<BlogPost[]> {
        return await db
            .select()
            .from(blogPosts)
            .orderBy(desc(blogPosts.publishedAt));
    }

    async getBlogPost(slug: string): Promise<BlogPost | undefined> {
        const [post] = await db
            .select()
            .from(blogPosts)
            .where(eq(blogPosts.slug, slug));
        return post;
    }

    async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
        const [post] = await db
            .insert(blogPosts)
            .values(insertPost)
            .returning();
        return post;
    }

    async updateBlogPost(
        id: number,
        updateData: Partial<InsertBlogPost>
    ): Promise<BlogPost> {
        const [post] = await db
            .update(blogPosts)
            .set(updateData)
            .where(eq(blogPosts.id, id))
            .returning();

        if (!post) {
            throw new Error(`Blog post with id ${id} not found`);
        }
        return post;
    }

    async deleteBlogPost(id: number): Promise<void> {
        await db.delete(blogPosts).where(eq(blogPosts.id, id));
    }

    // ===== PROJECT OPERATIONS =====
    async getProjects(): Promise<Project[]> {
        return await db
            .select()
            .from(projects)
            .orderBy(desc(projects.createdAt));
    }

    async getProject(id: number): Promise<Project | undefined> {
        const [project] = await db
            .select()
            .from(projects)
            .where(eq(projects.id, id));
        return project;
    }

    async createProject(insertProject: InsertProject): Promise<Project> {
        const [project] = await db
            .insert(projects)
            .values(insertProject)
            .returning();
        return project;
    }

    async updateProject(
        id: number,
        updateData: Partial<InsertProject>
    ): Promise<Project> {
        const [project] = await db
            .update(projects)
            .set(updateData)
            .where(eq(projects.id, id))
            .returning();

        if (!project) {
            throw new Error(`Project with id ${id} not found`);
        }
        return project;
    }

    async deleteProject(id: number): Promise<void> {
        await db.delete(projects).where(eq(projects.id, id));
    }

    // ===== TECH STACK OPERATIONS =====
    async getTechStacks(): Promise<TechStack[]> {
        return await db
            .select()
            .from(techStacks)
            .orderBy(techStacks.category, techStacks.name);
    }

    async getTechStack(id: number): Promise<TechStack | undefined> {
        const [techStack] = await db
            .select()
            .from(techStacks)
            .where(eq(techStacks.id, id));
        return techStack;
    }

    async createTechStack(
        insertTechStack: InsertTechStack
    ): Promise<TechStack> {
        const [techStack] = await db
            .insert(techStacks)
            .values(insertTechStack)
            .returning();
        return techStack;
    }

    async updateTechStack(
        id: number,
        updateData: Partial<InsertTechStack>
    ): Promise<TechStack> {
        const [techStack] = await db
            .update(techStacks)
            .set(updateData)
            .where(eq(techStacks.id, id))
            .returning();

        if (!techStack) {
            throw new Error(`Tech stack with id ${id} not found`);
        }
        return techStack;
    }

    async deleteTechStack(id: number): Promise<void> {
        await db.delete(techStacks).where(eq(techStacks.id, id));
    }
}

export const storage = new DbStorage();
