import knexFactory from '@js-items/knex/dist/factory';
import ResetPasswordToken from '../../../../types/items/ResetPasswordToken';
import resetPasswordTokensDocumentToItem from '../../../../utils/converters/resetPasswordTokens/documentToItem';
import resetPasswordTokensItemToDocument from '../../../../utils/converters/resetPasswordTokens/itemToDocument';
import { RepoConfig } from '../factory';

export default (config: RepoConfig) =>
  knexFactory<ResetPasswordToken>({
    convertDocumentIntoItem: resetPasswordTokensDocumentToItem,
    convertItemIntoDocument: resetPasswordTokensItemToDocument,
    db: config.db,
    itemName: 'Reset Password Tokens',
    tableName: 'reset_password_tokens',
  });
