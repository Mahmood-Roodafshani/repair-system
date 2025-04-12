import { i18n } from 'src/localization';
import { Gender } from '../enums/gender';
import { OptionType } from './optionType';

const GenderOptions: OptionType[] = [
  {
    id: Gender.MALE,
    label: i18n.t('gender_male')
  },
  {
    id: Gender.FEMALE,
    label: i18n.t('gender_female')
  }
];

export { GenderOptions };
