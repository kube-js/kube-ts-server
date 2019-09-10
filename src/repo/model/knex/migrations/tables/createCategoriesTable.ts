import { UUID_LENGTH } from '../../../../../constants';
import { RepoConfig } from '../../factory';

export default ({ db }: RepoConfig) => {
  const key = 'create_categories_table';

  const up = async () => {
    const connection = await db();

    const query = connection.schema.createTable('categories', table => {
      table.string('id', UUID_LENGTH).primary();
      table.string('title');
      table.string('slug').unique();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').nullable();
    });

    await Promise.resolve(query);
  };

  const down = async () => {
    const connection = await db();

    await Promise.resolve(connection.schema.dropTable('categories'));
  };

  return { key, up, down };
};
