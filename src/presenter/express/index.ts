import sourceMapSupport from "source-map-support";
sourceMapSupport.install();
import express from "express";
import { createServer } from "http";
import app from "./app";

const expressApp: express.Application = express();

expressApp.use("", app({}));

const server = createServer(expressApp);

server.listen("8080", () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening on localhost:8080`);
});
