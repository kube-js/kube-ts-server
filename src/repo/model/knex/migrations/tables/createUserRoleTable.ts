import { UUID_LENGTH } from '../../../../../constants';
import { RepoConfig } from '../../factory';

export default ({ db }: RepoConfig) => {
  const key = 'create_user_role_table';

  const up = async () => {
    const connection = await db();

    const query = connection.schema.createTable('user_role', table => {
      table.string('id', UUID_LENGTH).primary();
      table
        .string('userId', UUID_LENGTH)
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table
        .string('roleId', UUID_LENGTH)
        .references('id')
        .inTable('roles')
        .onDelete('cascade');
      table.dateTime('createdAt').notNullable().defaultTo(connection.fn.now());
      table.dateTime('updatedAt').nullable();
    });

    await Promise.resolve(query);
  };

  const down = async () => {
    const connection = await db();

    await Promise.resolve(connection.schema.dropTable('user_role'));
  };

  return { key, up, down };
};
