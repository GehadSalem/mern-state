import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.router.js";
import listingRouter from "./routes/listing.router.js"
import cors from "cors";
import connectDB from "../DB/connection.js";
import { globalErrorHandling } from './utils/errorHandling.js'
import path from 'path'


const initApp = (app, express) => {
  const __direname = path.resolve();
  app.use(cors());
  app.use(express.json({}));

  app.use("/api/user", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__direname, '/client/dist')))
  // Catch-all route for invalid URLs
  app.all("*", (req, res, next) => {
    res.sendFile(path.join(__direname, 'client', 'dist', 'index.html'));
  });

  //global error handling
  app.use(globalErrorHandling)
  // DB connection
  connectDB();
};

export default initApp;
