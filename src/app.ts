import express from "express";
import logger from "morgan";
import helmet from "helmet";
import http from "http";
import rTracer from "cls-rtracer";
import cors from "cors";
import env from "./config/env";
import errorMiddleware from "./middleware/errorMiddleware";
import loggerUtil from "./util/loggerUtil";

(async () => {
  try {
    const app = express();
    const server = http.createServer(app);
    app.use(
        cors({
          origin: process.env.FRONTEND_HOST,
        }),
    );

    app.use(helmet());

    await env.initiate();

    app.use(rTracer.expressMiddleware());
    app.use(logger("dev"));
    app.use(express.json());

    app.use("/api/", require("./routes"));

    app.use(errorMiddleware);

    server.listen(process.env.PORT, () => {
      loggerUtil.info("listening on port " + process.env.PORT);
    });
  } catch (e: any) {
    loggerUtil.error(
        `Failed to listen on port: ${process.env.PORT} ${e} stack: ${e.stack}`,
    );
  }
})();
