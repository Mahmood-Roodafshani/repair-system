import { i18n } from 'src/i18n';
import { Religion } from '../enums';
import { OptionType } from './optionType';

const ReligionOptions: OptionType[] = [
  {
    id: Religion.SHIA,
    label: i18n.t('religion_shia')
  },
  {
    id: Religion.SUNNI,
    label: i18n.t('religion_sunni')
  }
];

export { ReligionOptions };
