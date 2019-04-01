import Emails from '../../../interfaces/Emails';

const emails: Emails = {
  verifyYourEmailHtml: (link: string) => `<h1>Witaj,</h1><p>Aby aktywować swoje konto kliknij <a href="${link}">tutaj</a> lub przekopiuj podany adres do paska adresowego przeglądarki.</p><p>kube-ts-server</p>`,
  verifyYourEmailSubject: () => `[kube-ts-server] Weryfikacja adresu email`,
  verifyYourEmailText: (link: string) => `Witaj, aby aktywować swoje konto kliknij: ${link} albo przekopiuj go do paska adresowego przegladąrki. kube-ts-server`,
};

export default emails;
