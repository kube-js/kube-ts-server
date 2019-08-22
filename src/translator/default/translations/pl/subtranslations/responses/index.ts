import Responses from '../../../interfaces/Responses';

const responsesTranslations: Responses = {
  accountVerifiedSuccessfully: () => 'Konto zostało poprawnie aktywowane.',
  created: () => 'Utworzono',
  passwordChangedSuccessfully: () => 'Hasło zostało zmienione.',
  resetPasswordLinkSent: () =>
    `Jeśli podany email istnieje w naszym systemie, link resetujący hasło został wysłany.`,
};

export default responsesTranslations;
