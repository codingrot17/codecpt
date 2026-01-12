import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import * as readline from "readline";

function hashPassword(password: string): string {
    return crypto.createHash("sha256").update(password).digest("hex");
}

function validatePassword(password: string): {
    valid: boolean;
    message?: string;
} {
    if (password.length < 8) {
        return {
            valid: false,
            message: "Password must be at least 8 characters"
        };
    }
    if (!/[A-Z]/.test(password)) {
        return {
            valid: false,
            message: "Password must contain at least one uppercase letter"
        };
    }
    if (!/[a-z]/.test(password)) {
        return {
            valid: false,
            message: "Password must contain at least one lowercase letter"
        };
    }
    if (!/[0-9]/.test(password)) {
        return {
            valid: false,
            message: "Password must contain at least one number"
        };
    }
    return { valid: true };
}

async function prompt(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

async function createAdmin() {
    console.log("🔐 Admin User Setup");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    try {
        // Ask for username
        const username =
            (await prompt("Enter admin username (default: admin): ")) ||
            "admin";

        // Check if user already exists
        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.username, username));

        if (existingUser) {
            console.log(`\n⚠️  User '${username}' already exists!`);
            const overwrite = await prompt("Delete and recreate? (yes/no): ");

            if (overwrite.toLowerCase() !== "yes") {
                console.log("❌ Operation cancelled");
                process.exit(0);
            }

            await db.delete(users).where(eq(users.username, username));
            console.log("✓ Existing user deleted");
        }

        // Ask for password with validation
        let password = "";
        let passwordValid = false;

        while (!passwordValid) {
            password = await prompt("\nEnter password: ");
            const validation = validatePassword(password);

            if (!validation.valid) {
                console.log(`❌ ${validation.message}`);
                console.log("\nPassword requirements:");
                console.log("  • At least 8 characters");
                console.log("  • One uppercase letter");
                console.log("  • One lowercase letter");
                console.log("  • One number");
                continue;
            }

            const confirmPassword = await prompt("Confirm password: ");

            if (password !== confirmPassword) {
                console.log("❌ Passwords don't match. Try again.");
                continue;
            }

            passwordValid = true;
        }

        // Create admin user
        const hashedPassword = hashPassword(password);
        const [admin] = await db
            .insert(users)
            .values({
                username,
                password: hashedPassword,
                role: "admin"
            })
            .returning();

        console.log("\n✅ Admin user created successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log(`Username: ${username}`);
        console.log(`User ID: ${admin.id}`);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("⚠️  SAVE YOUR CREDENTIALS SECURELY!");
    } catch (error) {
        console.error("\n❌ Error creating admin:", error);
        throw error;
    } finally {
        process.exit(0);
    }
}

createAdmin();
