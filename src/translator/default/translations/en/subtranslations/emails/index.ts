import Emails from '../../../interfaces/Emails';
/** TODO: replace with https://github.com/wildbit/postmark-templates/tree/master/templates */
/** TODO: problem with the following: https://stackoverflow.com/questions/23798281/should-an-api-service-send-the-user-activation-email-or-the-client-application */
const emails: Emails = {
  remindPasswordHtml: (link: string) =>
    `<h1>Hello,</h1><p>There was recently a request to change the password for your account. </p><p>If you requested this password change, please click on the following link to reset your password: <a href="${link}">${link}</a></p><p>If clicking the link does not work, please copy and paste the URL into your browser instead. </p><p>If you did not make this request, you can ignore this message and your password will remain the same.</p><p>kube-ts-server</p>`,
  remindPasswordSubject: () => `[kube-ts-server] Change your password`,
  remindPasswordText: (link: string) =>
    `Hello, There was recently a request to change the password for your account. If you requested this password change, please click on the following link to reset your password: ${link}. If clicking the link does not work, please copy and paste the URL into your browser instead. If you did not make this request, you can ignore this message and your password will remain the same. kube-ts-server`,
  resetPasswordHtml: () =>
    `<h1>Hello,</h1><p>We wanted to let you know that your password was changed.</p><p>If you did not perform this action contact us immediately.</p><p>kube-ts-server</p>`,
  resetPasswordSubject: () => `[kube-ts-server] Your password has been changed`,
  resetPasswordText: () =>
    `Hello, we wanted to let you know that your password was changed. If you did not perform this action contact us immediately. kube-ts-server`,
  verifyYourEmailHtml: (link: string) =>
    `<h1>Hello,</h1><p>To activate your account click <a href="${link}">here</a>.</p><p>kube-ts-server</p>`,
  verifyYourEmailSubject: () => `[kube-ts-server] Verify your email`,
  verifyYourEmailText: (link: string) =>
    `Hello, to activate your account click: ${link}. kube-ts-server`,
};

export default emails;
