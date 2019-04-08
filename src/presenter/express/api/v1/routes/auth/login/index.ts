import { toSnake } from 'convert-keys';
import { OK } from 'http-status-codes';
import validateData from 'rulr/validateData';
import User from '../../../../../../../types/items/User';
import generateToken from '../../../../../../../utils/helpers/auth/generateToken';
import getVisibleUserProperties from '../../../../../../../utils/helpers/model/getVisibleUserProperties';
import Config from '../../../../../presenterFactory/Config';
import catchErrors from '../../../../../utils/errors/catchErrors';
import rules from '../../../../../utils/schemas/auth/login';

export default (config: Config) =>
  catchErrors(config, async (req, res) => {
    const { email, password } = req.body;

    validateData(rules)({ email, password });

    const user = await config.service.auth.login({
      email,
      password,
    });

    const visibleUserData: Partial<User> = getVisibleUserProperties(user);

    const token: string = generateToken({
      config: config.appConfig.auth.jwt,
      data: visibleUserData,
    });

    const data = toSnake({
      token,
      user: visibleUserData,
    });

    res.status(OK).json(data);
  });
