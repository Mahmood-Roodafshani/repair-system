import { i18n } from 'src/i18n';
import { JobStatus } from '../enums';
import { OptionType } from './optionType';

const JobStatusOptions: OptionType[] = [
  {
    id: JobStatus.ACTIVE,
    label: i18n.t('active')
  },
  {
    id: JobStatus.DEACTIVE,
    label: i18n.t('deactive')
  }
];

export { JobStatusOptions };
