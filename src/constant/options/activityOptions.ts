import { i18n } from 'src/localization';
import { OptionType } from './optionType';
import { ActivityStatus } from '../enums';

const ActivityOptions: OptionType[] = [
  {
    id: ActivityStatus.ACTIVE,
    label: i18n.t('active')
  },
  {
    id: ActivityStatus.INACTIVE,
    label: i18n.t('inactive')
  }
];

export { ActivityOptions };
