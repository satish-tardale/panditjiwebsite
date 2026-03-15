import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_dummy",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "dummy_secret",
});

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-pandit-key";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    // In real app, check if user exists and hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now().toString(), name, email, role };
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    res.json({ token, user });
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    // Mock login
    const user = { id: "123", name: "Test User", email, role: "user" };
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    res.json({ token, user });
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", city: "Pune", brand: "Book My Pandit" });
  });

  app.post("/api/payments/create-order", async (req, res) => {
    try {
      const { amount } = req.body;
      const options = {
        amount: amount * 100, // amount in smallest currency unit
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create payment order" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    // In a real app, we'd save to MongoDB here
    console.log("New Booking:", req.body);
    res.json({ success: true, message: "Booking received" });
  });

  // Mock Data Endpoints
  app.get("/api/pujas", (req, res) => {
    res.json([
      { id: "1", title: "Griha Pravesh", duration: "3-4 hrs", price: 5100, image: "https://picsum.photos/seed/temple/400/300" },
      { id: "2", title: "Satyanarayan Puja", duration: "2 hrs", price: 3100, image: "https://picsum.photos/seed/puja/400/300" },
      { id: "3", title: "Ganesh Puja", duration: "1.5 hrs", price: 2100, image: "https://picsum.photos/seed/ganesh/400/300" },
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Book My Pandit server running on http://localhost:${PORT}`);
  });
}

startServer();
