// tslint:disable:no-magic-numbers
import ResetPasswordToken from '../../../../../types/items/ResetPasswordToken';
import { TEST_UUID } from '../../tests/testData';
import baseFactory, { Options } from '../index';

const constantDate = new Date('2019-03-27T21:32:31.000Z');

const resetPasswordTokensFactory = async (
  options: Options<ResetPasswordToken>
) =>
  // tslint:disable-next-line:no-object-literal-type-assertion
  baseFactory<ResetPasswordToken>({
    expiresAt: constantDate,
    id: TEST_UUID,
    userId: TEST_UUID,
  } as Partial<ResetPasswordToken>)(options);

export default resetPasswordTokensFactory;
