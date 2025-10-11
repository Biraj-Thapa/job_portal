import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import authRoutes from "./routes/auth.route.js";



const app=express()

app.use(express.json());
dotenv.config();


const PORT = process.env.PORT || 6000

app.use("/api/auth", authRoutes);


app.listen(PORT, ()=>{
console.log(`listening on port ${PORT}`)
})