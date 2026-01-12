import {
    Router,
    type Request,
    type Response,
    type NextFunction
} from "express";
import { storage } from "./storage";
import crypto from "crypto";

// Simple password hashing (for demo - in production use bcrypt)
function hashPassword(password: string): string {
    return crypto.createHash("sha256").update(password).digest("hex");
}

function verifyPassword(password: string, hash: string): boolean {
    return hashPassword(password) === hash;
}

// Middleware to check if user is authenticated
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.session?.userId) {
        return res.status(401).json({ message: "Unauthorized - Please login" });
    }
    next();
}

export const authRouter = Router();

// Login endpoint
authRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Username and password required" });
        }

        // Get user from database
        const user = await storage.getUserByUsername(username);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Verify password
        if (!verifyPassword(password, user.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check if user is admin
        if (user.role !== "admin") {
            return res
                .status(403)
                .json({ message: "Access denied - Admin only" });
        }

        // Set session
        req.session.userId = user.id;
        req.session.username = user.username;

        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed" });
    }
});

// Logout endpoint
authRouter.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.json({ success: true });
    });
});

// Check auth status
authRouter.get("/status", (req, res) => {
    if (req.session?.userId) {
        res.json({
            authenticated: true,
            user: {
                id: req.session.userId,
                username: req.session.username
            }
        });
    } else {
        res.json({ authenticated: false });
    }
});
