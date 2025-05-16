import { i18n } from 'src/localization';
import * as Yup from 'yup';

const createValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(i18n.t('role_name_is_req'))
    .min(2, i18n.t('role_name_min_length'))
    .max(50, i18n.t('role_name_max_length')),
  identifier: Yup.string()
    .required(i18n.t('role_identifier_is_req'))
    .min(2, i18n.t('role_identifier_min_length'))
    .max(36, i18n.t('role_identifier_max_length')),
  status: Yup.string()
    .required(i18n.t('role_status_is_req'))
    .oneOf(['ACTIVE', 'INACTIVE'], i18n.t('role_status_is_req')),
  description: Yup.string().max(255, i18n.t('role_description_max_length')),
  permissionCodes: Yup.array()
    .min(1, i18n.t('role_permission_is_req'))
    .required(i18n.t('role_permission_is_req'))
});

const updateValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(i18n.t('role_name_is_req'))
    .min(2, i18n.t('role_name_min_length'))
    .max(50, i18n.t('role_name_max_length')),
  status: Yup.string()
    .required(i18n.t('role_status_is_req'))
    .oneOf(['ACTIVE', 'INACTIVE'], i18n.t('role_status_is_req')),
  description: Yup.string().max(255, i18n.t('role_description_max_length')),
  permissionCodes: Yup.array()
    .min(1, i18n.t('role_permission_is_req'))
    .required(i18n.t('role_permission_is_req'))
});

export { createValidationSchema, updateValidationSchema };
