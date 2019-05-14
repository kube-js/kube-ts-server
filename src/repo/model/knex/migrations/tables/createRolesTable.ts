import { UUID_LENGTH } from '../../../../../constants';
import { RepoConfig } from '../../factory';

export default ({ db }: RepoConfig) => {
  const key = 'create_roles_table';

  const up = async () => {
    const connection = await db();

    const query = connection.schema.createTable('roles', table => {
      table.string('id', UUID_LENGTH).primary();
      table.string('name').unique();
      table.dateTime('createdAt').notNullable().defaultTo(connection.fn.now());
      table.dateTime('updatedAt').nullable();
    });

    await Promise.resolve(query);
  };

  const down = async () => {
    const connection = await db();

    await Promise.resolve(connection.schema.dropTable('roles'));
  };

  return { key, up, down };
};
