import { Router } from "express";
import enhancedRouter from "../enhancedRouter";
import Config from "./Config";

const presenterFactory = (_config: Config): Router => {
  /** TODO: allow customize middlewares in enhanced config via config options */
  const router = enhancedRouter({});

  router.get("/", (_req, res) => {
    res.json({
      status: "ok"
    });
  });

  return router;
};

export default presenterFactory;
