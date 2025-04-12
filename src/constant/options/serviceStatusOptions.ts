import { i18n } from 'src/localization';
import { OptionType } from './optionType';
import { ServiceStatus } from '../enums';

const ServiceStatusOptions: OptionType[] = [
  {
    id: ServiceStatus.IN_PROGRESS,
    label: i18n.t('service_in_progress_status')
  },
  {
    id: ServiceStatus.RETRIED,
    label: i18n.t('service_retried_status')
  }
];

export { ServiceStatusOptions };
