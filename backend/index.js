import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import path from "path"
import { execPath } from "process";

dotenv.config({});

const app = express();

const _dirname = path.resolve();

// Basic API
app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "Message from backend",
        status: true
    })
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173', // Dev
    // origin: "https://jobportal-aun3.onrender.com", // Production
    // origin: '*', // for devlopment purpose only
    credentials: true
}
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});