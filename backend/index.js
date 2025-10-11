import express from "express"
import dotenv from "dotenv";
import { PrismaClient } from "./generated/prisma/index.js";



const app=express()
const prisma = new PrismaClient();

app.use(express.json());
dotenv.config();


const PORT = process.env.PORT || 6000

app.post("/api/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password, role },
    });
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "User creation failed" });
  }
});

app.listen(PORT, ()=>{
console.log(`listening on port ${PORT}`)
})