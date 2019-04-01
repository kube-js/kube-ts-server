import FactoryConfig from './FactoryConfig';
import nodemailerFactory from './nodemailer/factory';

export default (config: FactoryConfig) => {
  switch (config.type) {
    default:
    case 'nodemailer':
      return nodemailerFactory(config.nodemailer);
  }
};
