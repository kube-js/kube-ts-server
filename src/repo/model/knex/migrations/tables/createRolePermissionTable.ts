import { UUID_LENGTH } from '../../../../../constants';
import { RepoConfig } from '../../factory';

export default ({ db }: RepoConfig) => {
  const key = 'create_role_permission_table';

  const up = async () => {
    const connection = await db();

    const query = connection.schema.createTable('role_permission', table => {
      table.string('id', UUID_LENGTH).primary();
      table
        .string('roleId', UUID_LENGTH)
        .references('id')
        .inTable('roles')
        .onDelete('cascade');
      table
        .string('permissionId', UUID_LENGTH)
        .references('id')
        .inTable('permissions')
        .onDelete('cascade');
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').nullable();
    });

    await Promise.resolve(query);
  };

  const down = async () => {
    const connection = await db();

    await Promise.resolve(connection.schema.dropTable('role_permission'));
  };

  return { key, up, down };
};
