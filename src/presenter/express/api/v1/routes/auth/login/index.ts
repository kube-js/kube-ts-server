import { toSnake } from 'convert-keys';
import { OK } from 'http-status-codes';
import Intersection from 'rulr/Intersection';
import Record from 'rulr/Record';
import String from 'rulr/String';
import validateData from 'rulr/validateData';
import { VARCHAR_LENGTH } from '../../../../../../../constants';
import User from '../../../../../../../types/items/User';
import generateToken from '../../../../../../../utils/helpers/auth/generateToken';
import getVisibleUserProperties from '../../../../../../../utils/helpers/model/getVisibleUserProperties';
import Email from '../../../../../../../utils/validation/rules/Email';
import Config from '../../../../../presenterFactory/Config';
import catchErrors from '../../../../../utils/errors/catchErrors';

const rules = Record({
  email: Intersection([String(0, VARCHAR_LENGTH), Email()]),
  password: String(0, VARCHAR_LENGTH),
});

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
