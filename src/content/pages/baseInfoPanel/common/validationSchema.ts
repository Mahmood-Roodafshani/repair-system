import { i18n } from 'src/i18n';
import * as Yup from 'yup';

const filterValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, i18n.t('firstname_min_length'))
    .max(50, i18n.t('firstname_max_length')),
  lastname: Yup.string()
    .min(2, i18n.t('firstname_min_length'))
    .max(50, i18n.t('firstname_max_length')),
  fatherName: Yup.string()
    .min(2, i18n.t('father_name_min_length'))
    .max(50, i18n.t('father_name_max_length')),
  nationalCode: Yup.string().matches(
    /[0-9]{10}/,
    i18n.t('invalid_national_code')
  ),
  staffCode: Yup.string().matches(/[0-9]{3,20}/, i18n.t('invalid_staff_code')),
  idNumber: Yup.string().matches(/[0-9]{1,10}/, i18n.t('invalid_id_number'))
});

const createValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required(i18n.t('firstname_is_req'))
    .min(2, i18n.t('firstname_min_length'))
    .max(50, i18n.t('firstname_max_length')),
  lastname: Yup.string()
    .required(i18n.t('lastname_is_req'))
    .min(2, i18n.t('lastname_min_length'))
    .max(50, i18n.t('lastname_max_length')),
  fatherName: Yup.string()
    .required(i18n.t('father_name_is_req'))
    .min(2, i18n.t('father_name_min_length'))
    .max(50, i18n.t('father_name_max_length')),
  nationalCode: Yup.string()
    .required(i18n.t('national_code_is_req'))
    .matches(/[0-9]{10}/, i18n.t('invalid_national_code')),
  staffCode: Yup.string()
    .required(i18n.t('staff_code_is_req'))
    .matches(/[0-9]{3,20}/, i18n.t('invalid_staff_code')),
  idNumber: Yup.string()
    .required(i18n.t('id_number_is_req'))
    .matches(/[0-9]{1,10}/, i18n.t('invalid_id_number')),
  mobile: Yup.string()
    .required(i18n.t('mobile_is_req'))
    .matches(/^09[0-9]{9}$/, i18n.t('invalid_mobile')),
  address: Yup.string()
    .required(i18n.t('address_is_req'))
    .min(2, i18n.t('address_min_length'))
    .max(200, i18n.t('address_max_length')),
  hireDate: Yup.string().required(i18n.t('hire_date_is_req')),
  religion: Yup.string().required(i18n.t('religion_is_req')),
  degree: Yup.string().required(i18n.t('degree_is_req')),
  gender: Yup.string().required(i18n.t('gender_is_req')),
  serviceStatus: Yup.string().required(i18n.t('service_status_is_req')),
  militaryDegree: Yup.string().required(i18n.t('military_degree_is_req')),
  martialStatus: Yup.string().required(i18n.t('martial_status_is_req')),
  birthLocation: Yup.string().required(i18n.t('birth_location_is_req')),
  educationalField: Yup.string().required(i18n.t('educational_field_is_req')),
  workLocation: Yup.string().required(i18n.t('work_location_is_req'))
});

export { filterValidationSchema, createValidationSchema };
