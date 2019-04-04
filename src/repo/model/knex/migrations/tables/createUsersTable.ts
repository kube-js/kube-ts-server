import { UUID_LENGTH } from '../../../../../constants';
import { GenderType } from '../../../../../types/items/User';
import { RepoConfig } from '../../factory';

export default ({ db }: RepoConfig) => {
  const key = 'createUsersTable';

  const up = async () => {
    const connection = await db();

    const query = connection.schema.createTable('users', table => {
      table.string('id', UUID_LENGTH).primary();
      table.string('email').unique();
      table.string('password');
      table.string('firstName');
      table.string('lastName');
      table.text('bio');
      table.date('dateOfBirth').nullable();
      table.enum('gender', Object.keys(GenderType));
      table.dateTime('verifiedAt').nullable();
      table.dateTime('deletedAt').nullable();
      table
        .integer('loginFailedAttempts')
        .unsigned()
        .notNullable()
        .defaultTo(0);
      table.dateTime('authLastAttempt').nullable();
      table.dateTime('accountLockoutExpiresAt').nullable();
      table.dateTime('loginLastAttemptAt').nullable();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').nullable();
    });

    await Promise.resolve(query);
  };

  const down = async () => {
    const connection = await db();

    await Promise.resolve(connection.schema.dropTable('users'));
  };

  return { key, up, down };
};
