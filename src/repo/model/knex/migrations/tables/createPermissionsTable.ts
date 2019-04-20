import { UUID_LENGTH } from '../../../../../constants';
import { RepoConfig } from '../../factory';

export default ({ db }: RepoConfig) => {
  const key = 'create_permissions_table';

  const up = async () => {
    const connection = await db();

    const query = connection.schema.createTable('permissions', table => {
      table.string('id', UUID_LENGTH).primary();
      table.string('name').unique();
      table.string('method').notNullable();
      table.string('url').notNullable();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').nullable();
    });

    await Promise.resolve(query);
  };

  const down = async () => {
    const connection = await db();

    await Promise.resolve(connection.schema.dropTable('permissions'));
  };

  return { key, up, down };
};
