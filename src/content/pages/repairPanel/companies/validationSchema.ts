import { i18n } from 'src/i18n';
import * as Yup from 'yup';

const filterValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, i18n.t('job_title_min_length'))
    .max(50, i18n.t('job_title_max_length'))
});

const createValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(i18n.t('company_name_is_req'))
    .min(2, i18n.t('company_name_min_length'))
    .max(50, i18n.t('company_name_max_length')),
  activityField: Yup.string().required(i18n.t('activity_field_is_req')),
  tel: Yup.string()
    .required(i18n.t('tel_is_req'))
    .min(6, i18n.t('tel_min_length'))
    .min(11, i18n.t('tel_max_length'))
    .matches(/^\d{3}( - |-| -|- )?\d{6,10}$/, i18n.t('invalid_tel')),
  address: Yup.string()
    .required(i18n.t('address_is_req'))
    .min(2, i18n.t('address_min_length'))
    .max(200, i18n.t('address_max_length')),
  ceo: Yup.string()
    .required(i18n.t('ceo_is_req'))
    .min(2, i18n.t('ceo_min_length'))
    .max(50, i18n.t('ceo_max_length')),
  email: Yup.string()
    .required(i18n.t('email_or_social_id_is_req'))
    .min(2, i18n.t('email_or_social_id_min_length'))
    .max(100, i18n.t('email_or_social_id_max_length')),
  canBePartner: Yup.string().required(i18n.t('can_be_partner_is_req'))
});

export { filterValidationSchema, createValidationSchema };
