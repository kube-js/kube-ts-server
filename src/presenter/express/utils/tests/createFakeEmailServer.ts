import MailDev from 'maildev';
import { NodeMailerConfig } from '../../../../config/subconfigs/repo/mail';

const createFakeEmailServer = async (config: NodeMailerConfig): Promise<any> =>
  new Promise(resolve => {
    const maildev = new MailDev({
      disableWeb: true,
      silent: true,
      smtp: config.port,
    });

    maildev.listen();
    maildev.on('new', (email: any) => {
      (maildev as any).close();
      resolve(email);
    });
  });

export default createFakeEmailServer;
