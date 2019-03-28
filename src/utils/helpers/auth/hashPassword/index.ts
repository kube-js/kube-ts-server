import * as argon2 from 'argon2';

export default (value: string): Promise<string> =>
  argon2.hash(value, {
    type: argon2.argon2id,
  });
