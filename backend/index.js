import express from "express"
import dotenv from "dotenv";
dotenv.config();

import cors from "cors"
import path from "path";
import cron from "node-cron";

import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js"
import { deleteExpiredJobs } from "./utils/deleteExpiredJobs.js";



const app=express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

const PORT = process.env.PORT || 6000

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily job cleanup...");
  await deleteExpiredJobs();
});

deleteExpiredJobs();
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes)
app.use("/api/applications", applicationRoutes);


app.listen(PORT, ()=>{
console.log(`listening on port ${PORT}`)
})