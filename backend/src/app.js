import express from "express";
import cors from "cors";
import helmet from "helmet";
import voiceRoutes from "./routes/voice.route.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());

// ✅ Root health check
app.get("/", (req, res) => {
    res.send("<h1>✅ Voice Assistant Backend Online</h1>");
});

app.use("/voice", voiceRoutes);

export default app;