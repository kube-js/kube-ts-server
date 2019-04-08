import Responses from '../../../interfaces/Responses';

const responsesTranslations: Responses = {
  accountVerifiedSuccessfully: () => 'Account verified successfully. You can now log in.',
  passwordChangedSuccessfully: () => 'Password changed successfully. You can now log in.',
  resetPasswordLinkSent: () =>
    `If the email you specified exists in our system, we've sent a password reset link to it.`,
};

export default responsesTranslations;
