import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import * as readline from "readline";

function hashPassword(password: string): string {
    return crypto.createHash("sha256").update(password).digest("hex");
}

function verifyPassword(password: string, hash: string): boolean {
    return hashPassword(password) === hash;
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

async function changePassword() {
    console.log("🔐 Change Admin Password");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    try {
        // Get username
        const username = await prompt("\nEnter username: ");

        // Find user
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.username, username));

        if (!user) {
            console.log(`❌ User '${username}' not found`);
            process.exit(1);
        }

        // Verify current password
        const currentPassword = await prompt("Enter current password: ");

        if (!verifyPassword(currentPassword, user.password)) {
            console.log("❌ Current password is incorrect");
            process.exit(1);
        }

        console.log("✓ Current password verified");

        // Get new password with validation
        let newPassword = "";
        let passwordValid = false;

        while (!passwordValid) {
            newPassword = await prompt("\nEnter new password: ");
            const validation = validatePassword(newPassword);

            if (!validation.valid) {
                console.log(`❌ ${validation.message}`);
                console.log("\nPassword requirements:");
                console.log("  • At least 8 characters");
                console.log("  • One uppercase letter");
                console.log("  • One lowercase letter");
                console.log("  • One number");
                continue;
            }

            // Check if new password is same as old
            if (newPassword === currentPassword) {
                console.log(
                    "❌ New password must be different from current password"
                );
                continue;
            }

            const confirmPassword = await prompt("Confirm new password: ");

            if (newPassword !== confirmPassword) {
                console.log("❌ Passwords don't match. Try again.");
                continue;
            }

            passwordValid = true;
        }

        // Update password
        const hashedPassword = hashPassword(newPassword);
        await db
            .update(users)
            .set({ password: hashedPassword })
            .where(eq(users.username, username));

        console.log("\n✅ Password changed successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("You can now login with your new password.");
    } catch (error) {
        console.error("\n❌ Error changing password:", error);
        throw error;
    } finally {
        process.exit(0);
    }
}

changePassword();
