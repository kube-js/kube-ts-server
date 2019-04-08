import Responses from '../../../interfaces/Responses';

const responsesTranslations: Responses = {
  accountVerifiedSuccessfully: () => 'Konto zostało poprawnie aktywowane',
  passwordChangedSuccessfully: () => 'Hasło zostało zmienione. Mozesz teraz zalogować się używając nowego hasła.',
  resetPasswordLinkSent: () =>
    `Jeśli podany email istnieje w naszym systemie, link resetujący hasło został wysłany.`,
};

export default responsesTranslations;
