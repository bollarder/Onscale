import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { users, sessions } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import { loginSchema, registerSchema } from "@shared/schema";
import { z } from "zod";

const router = Router();

// JWT secret - in production, this should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, validatedData.username))
      .limit(1);
    
    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Username already exists"
      });
    }

    // Check if email already exists
    const existingEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email))
      .limit(1);
    
    if (existingEmail.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const newUser = await db
      .insert(users)
      .values({
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
        firstName: validatedData.firstName || null,
        lastName: validatedData.lastName || null,
        role: "user",
        isActive: "true"
      })
      .returning();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser[0].id, 
        username: newUser[0].username,
        role: newUser[0].role 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Create session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await db.insert(sessions).values({
      userId: newUser[0].id,
      token,
      expiresAt
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: newUser[0].id,
          username: newUser[0].username,
          email: newUser[0].email,
          firstName: newUser[0].firstName,
          lastName: newUser[0].lastName,
          role: newUser[0].role
        },
        token
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors
      });
    }
    
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    
    // Find user by username
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, validatedData.username))
      .limit(1);

    if (user.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const foundUser = user[0];

    // Check if user is active
    if (foundUser.isActive !== "true") {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated"
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(validatedData.password, foundUser.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Update last login
    await db
      .update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, foundUser.id));

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: foundUser.id, 
        username: foundUser.username,
        role: foundUser.role 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Create session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await db.insert(sessions).values({
      userId: foundUser.id,
      token,
      expiresAt
    });

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          role: foundUser.role
        },
        token
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors
      });
    }
    
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

// Logout endpoint
router.post("/logout", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.substring(7);

    // Delete session
    await db
      .delete(sessions)
      .where(eq(sessions.token, token));

    res.json({
      success: true,
      message: "Logout successful"
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

// Verify token endpoint
router.get("/verify", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.substring(7);

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // Check if session exists and is valid
    const session = await db
      .select()
      .from(sessions)
      .where(
        and(
          eq(sessions.token, token),
          eq(sessions.userId, decoded.userId)
        )
      )
      .limit(1);

    if (session.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid session"
      });
    }

    // Check if session is expired
    if (new Date() > session[0].expiresAt) {
      // Delete expired session
      await db
        .delete(sessions)
        .where(eq(sessions.token, token));
      
      return res.status(401).json({
        success: false,
        message: "Session expired"
      });
    }

    // Get user data
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.userId))
      .limit(1);

    if (user.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user[0].id,
          username: user[0].username,
          email: user[0].email,
          firstName: user[0].firstName,
          lastName: user[0].lastName,
          role: user[0].role
        }
      }
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }
    
    console.error("Token verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

export { router as authRoutes };
