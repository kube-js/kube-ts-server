import { Router } from 'express';
import Config from '../../presenterFactory/Config';

export default interface Options {
  readonly router: Router;
  readonly config: Config;
}
