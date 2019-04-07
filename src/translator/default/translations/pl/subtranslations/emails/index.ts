import Emails from '../../../interfaces/Emails';

const emails: Emails = {
  resetPasswordHtml: (link: string) => `<h1>Witaj,</h1><p>Aby zmienić swoje hasło kliknij <a href="${link}" target="_blank">tutaj</a></p><p>kube-ts-server</p>`,
  resetPasswordSubject: () => `[kube-ts-server] Zmiana hasła`,
  resetPasswordText: (link: string) => `Witaj, aby zmienić swoje hasło kliknij: ${link}. kube-ts-server`,
  verifyYourEmailHtml: (link: string) => `<h1>Witaj,</h1><p>Aby aktywować swoje konto kliknij <a href="${link}" target="_blank">tutaj</a> lub przekopiuj podany adres do paska adresowego przeglądarki.</p><p>kube-ts-server</p>`,
  verifyYourEmailSubject: () => `[kube-ts-server] Weryfikacja adresu email`,
  verifyYourEmailText: (link: string) => `Witaj, aby aktywować swoje konto kliknij: ${link} albo przekopiuj go do paska adresowego przegladąrki. kube-ts-server`,
};

export default emails;
