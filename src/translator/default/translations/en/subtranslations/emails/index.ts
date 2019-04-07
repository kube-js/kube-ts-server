import Emails from '../../../interfaces/Emails';

const emails: Emails = {
  resetPasswordHtml: (link: string) => `<h1>Hello,</h1><p>To reset your password click <a href="${link}">here</a></p><p>kube-ts-server</p>`,
  resetPasswordSubject: () => `[kube-ts-server] Reset your password`,
  resetPasswordText: (link: string) => `Hello, to reset your password click: ${link}. kube-ts-server`,
  verifyYourEmailHtml: (link: string) => `<h1>Hello,</h1><p>To activate your account click <a href="${link}">here</a>.</p><p>kube-ts-server</p>`,
  verifyYourEmailSubject: () => `[kube-ts-server] Verify your email`,
  verifyYourEmailText: (link: string) => `Hello, to activate your account click: ${link}. kube-ts-server`,
};

export default emails;
