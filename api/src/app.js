import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.router.js";
import cors from "cors";
import connectDB from "../DB/connection.js";
import { globalErrorHandling } from './utils/errorHandling.js'

const initApp = (app, express) => {
  app.use(cors());
  app.use(express.json({}));

  app.use("/api/user", userRouter);
  app.use("/api/auth", authRouter);

  // Catch-all route for invalid URLs
  app.all("*", (req, res, next) => {
    res.send("In-valid Routing Plz check url or method");
  });

  //global error handling
  app.use(globalErrorHandling)
  // DB connection
  connectDB();
};

export default initApp;
