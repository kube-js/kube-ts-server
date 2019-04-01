import { UUID_LENGTH } from '../../../../../constants';
import { RepoConfig } from '../../factory';


export default ({ db }: RepoConfig) => {

  const key = 'createResetPasswordTokensTable';

  const up = async () => {
    const connection = await db();
    const uuidLength = 36;
    const query = connection.schema.createTable('resetPasswordTokens', (table) => {
      table.string('id', UUID_LENGTH).primary();
      table.string('userId', uuidLength)
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table.dateTime('expiresAt');
      table.dateTime('createdAt');
      table.dateTime('updatedAt').nullable();
    });
    await Promise.resolve(query);
  };

  const down = async () => {
    const connection = await db();
    await Promise.resolve(connection.schema.dropTable('resetPasswordTokens'));
  };

  return { key, up, down };
};
