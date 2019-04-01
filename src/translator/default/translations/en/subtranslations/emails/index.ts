import Emails from '../../../interfaces/Emails';

const emails: Emails = {
  verifyYourEmailHtml: (link: string) => `<h1>Hello,</h1><p>To activate your account click <a href="${link}">here</a>, alternatively if the address is not active copy/paste into your browser.</p><p>kube-ts-server</p>`,
  verifyYourEmailSubject: () => `[kube-ts-server] Verify your email`,
  verifyYourEmailText: (link: string) => `Hello, to activate your account click: ${link}, alternatively if the address is not active copy/paste into your browser. kube-ts-server`,
};

export default emails;
