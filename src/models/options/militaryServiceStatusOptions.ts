import { i18n } from 'src/i18n';
import { OptionType } from './optionType';
import { MilitaryServiceStatus } from '../enums';

const MilitaryServiceStatusOptions: OptionType[] = [
  {
    id: MilitaryServiceStatus.DONE,
    label: i18n.t('military_service_done_status')
  },
  {
    id: MilitaryServiceStatus.EXEMPT,
    label: i18n.t('military_service_exempt_status')
  }
];

export { MilitaryServiceStatusOptions };
