import Emails from './Emails';
import Errors from './Errors';
import Responses from './Responses';
import Validation from './Validation';

export default interface Translation extends Errors, Validation, Emails, Responses {}
