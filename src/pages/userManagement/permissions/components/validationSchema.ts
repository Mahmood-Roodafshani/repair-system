import { i18n } from 'src/localization';
import * as Yup from 'yup';

const createValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(i18n.t('permission_name_is_req'))
    .min(2, i18n.t('permission_name_min_length'))
    .max(50, i18n.t('permission_name_max_length')),
  identifier: Yup.string()
    .required(i18n.t('permission_identifier_is_req'))
    .min(2, i18n.t('permission_identifier_min_length'))
    .max(36, i18n.t('permission_identifier_max_length')),
  operationType: Yup.string().required(
    i18n.t('permission_operation_type_is_req')
  ),
  state: Yup.string()
    .required(i18n.t('permission_state_is_req'))
    .oneOf(['ACTIVE', 'INACTIVE'], i18n.t('permission_state_is_req')),
  description: Yup.string().max(
    255,
    i18n.t('permission_description_max_length')
  ),
  url: Yup.string()
    .required(i18n.t('permission_url_is_req'))
    .min(7, i18n.t('permission_url_min_length'))
    .max(255, i18n.t('permission_url_max_length'))
    .matches(
      /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
      i18n.t('permission_incorrect_url')
    )
});

const updateValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(i18n.t('permission_name_is_req'))
    .min(2, i18n.t('permission_name_min_length'))
    .max(50, i18n.t('permission_name_max_length')),
  operationType: Yup.string().required(
    i18n.t('permission_operation_type_is_req')
  ),
  state: Yup.string()
    .required(i18n.t('permission_state_is_req'))
    .oneOf(['ACTIVE', 'INACTIVE'], i18n.t('permission_state_is_req')),
  description: Yup.string().max(
    255,
    i18n.t('permission_description_max_length')
  ),
  url: Yup.string()
    .required(i18n.t('permission_url_is_req'))
    .min(7, i18n.t('permission_url_min_length'))
    .max(255, i18n.t('permission_url_max_length'))
    .matches(
      /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
      i18n.t('permission_incorrect_url')
    )
});

export { createValidationSchema, updateValidationSchema };
