import { UUID_LENGTH } from '../../../../../constants';
import { RepoConfig } from '../../factory';

export default ({ db }: RepoConfig) => {
  const key = 'create_reset_password_tokens_table';

  const up = async () => {
    const connection = await db();
    const query = connection.schema.createTable(
      'reset_password_tokens',
      table => {
        table.string('id', UUID_LENGTH).primary();
        table
          .string('userId', UUID_LENGTH)
          .references('id')
          .inTable('users')
          .onDelete('cascade');
        table.dateTime('expiresAt');
        table.dateTime('createdAt').notNullable();
        table.dateTime('updatedAt').nullable();
      }
    );
    await Promise.resolve(query);
  };

  const down = async () => {
    const connection = await db();
    await Promise.resolve(connection.schema.dropTable('reset_password_tokens'));
  };

  return { key, up, down };
};
