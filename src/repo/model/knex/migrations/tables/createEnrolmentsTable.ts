import { UUID_LENGTH } from '../../../../../constants';
import { RepoConfig } from '../../factory';

export default ({ db }: RepoConfig) => {
  const key = 'create_enrolments_table';

  const up = async () => {
    const connection = await db();

    const query = connection.schema.createTable('enrolments', table => {
      table.string('id', UUID_LENGTH).primary();
      table
        .string('userId', UUID_LENGTH)
        .references('id')
        .inTable('users')
        .onDelete('cascade');
      table
        .string('courseId', UUID_LENGTH)
        .references('id')
        .inTable('courses')
        .onDelete('cascade');
      table
        .dateTime('createdAt')
        .notNullable()
        .defaultTo(connection.fn.now());
      table.dateTime('updatedAt').nullable();
      table.dateTime('deletedAt').nullable();
      table.unique(['courseId', 'userId'])
    });

    await Promise.resolve(query);
  };

  const down = async () => {
    const connection = await db();

    await Promise.resolve(connection.schema.dropTable('enrolments'));
  };

  return { key, up, down };
};
