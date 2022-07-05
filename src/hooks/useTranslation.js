import * as dictionaries from '../intl';

const useTranslation = (lang) => dictionaries[lang.toLowerCase()];

export default useTranslation;
