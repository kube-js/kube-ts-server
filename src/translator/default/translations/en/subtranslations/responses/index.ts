import Responses from '../../../interfaces/Responses';

const responsesTranslations: Responses = {
  accountVerifiedSuccessfully: () => 'Account verified successfully',
  created: () => 'Created',
  passwordChangedSuccessfully: () => 'Password changed successfully',
  resetPasswordLinkSent: () =>
    `If the email you specified exists in our system, we've sent a password reset link to it.`,
};

export default responsesTranslations;
