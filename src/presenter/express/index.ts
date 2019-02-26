import sourceMapSupport from "source-map-support";
sourceMapSupport.install();
import express from "express";

const app: express.Application = express();

const presenterFacade = (_req: express.Request, res: express.Response) => {
  res.json({
    success: "ok"
  });
};

app.use("/api/v1", presenterFacade);

app.listen("8080", () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening on port 8080`);
});
