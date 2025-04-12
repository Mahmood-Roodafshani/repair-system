import { i18n } from 'src/localization';
import { JobLevel } from '../enums';
import { OptionType } from './optionType';

const JobLevelOptions: OptionType[] = [
  {
    id: JobLevel.MANAGER,
    label: i18n.t('job_level_manager')
  },
  {
    id: JobLevel.EXPERT,
    label: i18n.t('job_level_expert')
  },
  {
    id: JobLevel.BOSS,
    label: i18n.t('job_level_boss')
  }
];

export { JobLevelOptions };
