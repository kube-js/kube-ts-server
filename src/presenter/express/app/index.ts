import { Router } from "express";
import presenterFactory from "../presenterFactory";
import Config from "./Config";

export default (_config: Config): Router => {
  /** TODO: inject repo, service, logger */

  const presenter = presenterFactory({});

  return presenter;
};
