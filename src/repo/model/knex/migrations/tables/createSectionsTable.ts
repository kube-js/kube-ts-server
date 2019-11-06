import { UUID_LENGTH } from '../../../../../constants';
import { RepoConfig } from '../../factory';

export default ({ db }: RepoConfig) => {
  const key = 'create_sections_table';

  const up = async () => {
    const connection = await db();

    const query = connection.schema.createTable('sections', table => {
      table.string('id', UUID_LENGTH).primary();
      table
        .string('courseId', UUID_LENGTH)
        .references('id')
        .inTable('courses')
        .onDelete('cascade');
      table.string('title');
      table.integer('order').defaultTo(0);
      table.boolean('isPublished').defaultTo(true);
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').nullable();
    });

    await Promise.resolve(query);
  };

  const down = async () => {
    const connection = await db();

    await Promise.resolve(connection.schema.dropTable('sections'));
  };

  return { key, up, down };
};
