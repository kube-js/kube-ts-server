/**
 * @author      Created by Marcus Spiegel <marcus.spiegel@gmail.com> on 2011-03-25.
 * @link        https://github.com/mashpie/i18n-node
 * @license     http://opensource.org/licenses/MIT
 * Get a sorted list of accepted languages from the HTTP Accept-Language header
 */
// tslint:disable:no-magic-numbers

const getAcceptedLanguagesFromHeader = (header: string) => {
  const languages = header.split(',');
  const preferences: { [key: string]: any } = {};

  return languages
    .map(item => {
      const preferenceParts: any = item.trim().split(';q=');

      if (preferenceParts.length < 2) {
        preferenceParts[1] = 1.0;
      } else {
        const quality = parseFloat(preferenceParts[1]);
        preferenceParts[1] = !isNaN(quality) ? quality : 0.0;
      }

      preferences[preferenceParts[0]] = preferenceParts[1];

      return preferenceParts[0];
    })
    .filter(lang => preferences[lang] > 0)
    .sort((a, b) => preferences[b] - preferences[a]);
};

export default getAcceptedLanguagesFromHeader;
