import { toCamel } from 'convert-keys';
import { CREATED } from 'http-status-codes';
import _omit from 'ramda/src/omit';
import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import User from '../../../../../../../types/items/User';
import generateToken from '../../../../../../../utils/helpers/auth/generateToken';
import getVisibleUserProperties from '../../../../../../../utils/helpers/model/getVisibleUserProperties';
import Config from '../../../../../presenterFactory/Config';
import catchErrors from '../../../../../utils/errors/catchErrors';
import rules, { schema } from '../../../../../utils/schemas/auth/register';

export default (config: Config) =>
  catchErrors(config, async (req, res) => {
    const payload: any = _pick(Object.keys(schema), req.body);

    const { password_confirmation, ...data } = validateData(rules)(payload);

    const {
      bio,
      dateOfBirth,
      email,
      firstName,
      gender,
      lastName,
      password,
    } = toCamel(data);

    const user = await config.service.auth.register({
      bio,
      dateOfBirth,
      email,
      firstName,
      gender,
      lastName,
      password,
    });
    const visibleUserData: Partial<User> = getVisibleUserProperties(user);

    const token: string = generateToken({
      config: config.appConfig.auth.jwt,
      data: visibleUserData,
    });

    res.status(CREATED).json({
      token,
      user: visibleUserData,
    });
  });
