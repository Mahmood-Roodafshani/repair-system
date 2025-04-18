import { i18n } from '@/localization';
import { CommissionFixDecision } from '../enums';
import { OptionType } from './optionType';

const CommissionFixDecisionOptions: OptionType[] = [
  {
    id: CommissionFixDecision.FIX_WITH_OFFICE_PAY,
    label: i18n.t('fix_with_office_pay')
  },
  {
    id: CommissionFixDecision.FIX_WITH_PERSONAL_PAY,
    label: i18n.t('fix_with_personal_pay')
  },
  {
    id: CommissionFixDecision.FIX_WITH_PERSONAL_AND_OFFICE_PAY,
    label: i18n.t('fix_with_personal_and_office_pay')
  },
  {
    id: CommissionFixDecision.DONT_FIX,
    label: i18n.t('dont_fix')
  }
];

export { CommissionFixDecisionOptions };
