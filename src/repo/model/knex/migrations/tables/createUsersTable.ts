import { UUID_LENGTH } from '../../../../../constants';
import { GenderType } from '../../../../../types/items/User';
import { RepoConfig } from '../../factory';

export default ({ db }: RepoConfig) => {
  const key = 'create_users_table';

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
      table.string('verifyToken', UUID_LENGTH).nullable();
      // https://serverless.com/blog/s3-one-time-signed-url/
      // https://github.com/expressjs/multer
      // https://www.js-tutorials.com/nodejs-tutorial/amazon-s3-image-upload-using-nodejs/
      // https://github.com/badunk/multer-s3
      // https://blog.bigbinary.com/2018/09/04/uploading-files-directly-to-s3-using-pre-signed-post-request.html
      // https://github.com/SanderKnape/aws-upload-to-s3
      // https://www.youtube.com/watch?v=ASuU4km3VHE
      // https://www.quora.com/How-do-I-link-a-file-from-S3-to-DynamoDB
      table.string('avatar');
      table.dateTime('deletedAt').nullable();
      table
        .integer('verifyAttempts')
        .unsigned()
        .notNullable()
        .defaultTo(0);
      table.dateTime('verifyLastAttemptAt').nullable();
      table.dateTime('verifyLockoutExpiresAt').nullable();
      table
        .integer('loginFailedAttempts')
        .unsigned()
        .notNullable()
        .defaultTo(0);
      table.dateTime('loginLockoutExpiresAt').nullable();
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
