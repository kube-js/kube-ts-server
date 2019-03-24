/**
 * @author      Created by Marcus Spiegel <marcus.spiegel@gmail.com> on 2011-03-25.
 * @link        https://github.com/mashpie/i18n-node
 * @license     http://opensource.org/licenses/MIT
 * Get a sorted list of accepted languages from the HTTP Accept-Language header
 */
// tslint:disable:no-magic-numbers
import { Request } from 'express';
import reduceRight from 'ramda/src/reduceRight';
import { SUPPORTED_LOCALES } from '../../../../../../constants';
import getAcceptedLanguagesFromHeader from '../getAcceptedLanguagesFromHeader';

export interface Options {
  readonly req: Request;
  readonly headerName: string;
}

const getLocaleFromHeader = ({ req, headerName }: Options) => {
  const languageHeader = req.header(headerName);

  if (languageHeader !== undefined) {
    const acceptedLanguages = getAcceptedLanguagesFromHeader(languageHeader);

    const acceptedParentLanguages: string[] = acceptedLanguages.map(lang => {
      const [parentLangugage] = lang.split('-', 2);

      return parentLangugage;
    });

    if (acceptedParentLanguages.length === 0) {
      return null;
    }

    const locale = reduceRight(
      (elem, acc) => (SUPPORTED_LOCALES.includes(elem) ? elem : acc),
      '',
      acceptedParentLanguages
    );

    return locale === '' ? null : locale;
  }

  return null;
};

export default getLocaleFromHeader;
