import { UUID_LENGTH } from '../../../../../constants';
import { RepoConfig } from '../../factory';

export default ({ db }: RepoConfig) => {
  const key = 'create_courses_table';

  const up = async () => {
    const connection = await db();

    const query = connection.schema.createTable('courses', table => {
      table.string('id', UUID_LENGTH).primary();
      // TODO: multiple instructors?
      table
        .string('userId', UUID_LENGTH)
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table
        .string('categoryId', UUID_LENGTH)
        .references('id')
        .inTable('categories')
        .onDelete('cascade');
      table.string('title');
      table.text('description');
      table.text('requirements');
      table.text('goals');
      table.string('imageUrl');
      table.string('slug').unique();
      table.boolean('isPaid').defaultTo(false);
      table.boolean('isPublished').defaultTo(false);
      table.boolean('isApproved').defaultTo(false);
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').nullable();
      table.dateTime('deletedAt').nullable();
    });

    await Promise.resolve(query);
  };

  const down = async () => {
    const connection = await db();

    await Promise.resolve(connection.schema.dropTable('courses'));
  };

  return { key, up, down };
};
