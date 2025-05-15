import { i18n } from 'src/localization';
import { JobStatus } from '../enums';
import { OptionType } from './optionType';

const JobStatusOptions: OptionType[] = [
  {
    id: JobStatus.ACTIVE,
    label: i18n.t('active')
  },
  {
    id: JobStatus.INACTIVE,
    label: i18n.t('inactive')
  }
];

export { JobStatusOptions };
