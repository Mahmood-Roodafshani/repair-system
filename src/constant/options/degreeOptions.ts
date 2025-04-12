import { i18n } from 'src/localization';
import { OptionType } from './optionType';
import { Degree } from '../enums';

const DegreeOptions: OptionType[] = [
  {
    id: Degree.PHD,
    label: i18n.t('phd')
  },
  {
    id: Degree.MASTER,
    label: i18n.t('master')
  },
  {
    id: Degree.BACHELOR,
    label: i18n.t('bachelor')
  }
];

export { DegreeOptions };
