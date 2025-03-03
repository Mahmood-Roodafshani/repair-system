import { i18n } from 'src/i18n';
import { FamilyRelation } from '../enums';
import { OptionType } from './optionType';

const FamilyRelationOptions: OptionType[] = [
  {
    id: FamilyRelation.WIFE_HUSBAND,
    label: i18n.t('family_relation_wife_husband')
  },
  {
    id: FamilyRelation.FATHER,
    label: i18n.t('family_relation_father')
  },
  {
    id: FamilyRelation.MOTHER,
    label: i18n.t('family_relation_mother')
  },
  {
    id: FamilyRelation.BROTHER,
    label: i18n.t('family_relation_brother')
  },
  {
    id: FamilyRelation.SISTER,
    label: i18n.t('family_relation_sister')
  },
  {
    id: FamilyRelation.SON,
    label: i18n.t('family_relation_son')
  },
  {
    id: FamilyRelation.DAUGHTER,
    label: i18n.t('family_relation_daughter')
  }
];

export { FamilyRelationOptions };
