import * as argon2 from 'argon2';

export default (hashedPassword: string, password: string): Promise<boolean> =>
  argon2.verify(hashedPassword, password);
