import { i18n } from 'src/i18n';
import { MaritalStatus } from '../enums/maritalStatus';
import { OptionType } from './optionType';

const MaritalStatusOptions: OptionType[] = [
  {
    id: MaritalStatus.MARRIED,
    label: i18n.t('marital_married_status')
  },
  {
    id: MaritalStatus.SINGLE,
    label: i18n.t('marital_single_status')
  }
];

export { MaritalStatusOptions };
