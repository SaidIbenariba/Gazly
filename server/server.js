import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
import sensorRoutes from "./routes/sensors.js";
import observationRoutes from "./routes/observations.js";
import missionRoutes from "./routes/missions.js";
import meetingRoutes from "./routes/meetings.js";
import measureRoutes from "./routes/measures.js";
import espaceRoutes from "./routes/espaces.js";
import authRoutes from "./routes/auth.js";
import affectionRoutes from "./routes/affectations.js"; 
import refreshRoutes from "./routes/refresh.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import events from 'events';

events.EventEmitter.defaultMaxListeners = 20;
const app = express();

// app.use(express.static(path.join(__dirname, "public")));
// option 1 : allows all origins with default cors
// app.use(cors()); // cors policy
// option 2 : custom origins
// app.use(cors({
//   origin:'http://localhost:5173/',
//   methods:['GET','POST','PUT','DELETE'];
//   allowedHeaders:[],
// }))
app.use(express.json());
const port = 5000;

// MIDDLEWARES

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRoutes); 
app.use("/refresh", refreshRoutes);
app.use(verifyJWT);
app.use("/api/tasks", taskRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/observations", observationRoutes);
app.use("/api/missions", missionRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/measures", measureRoutes);
app.use("/api/workspaces", espaceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/affectations", affectionRoutes); 
app.listen(port, () => {
  console.log(`our API working on ${port}`);
});
