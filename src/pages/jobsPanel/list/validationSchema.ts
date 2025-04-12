import { i18n } from 'src/localization';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required(i18n.t('job_title_is_req'))
    .min(2, i18n.t('job_title_min_length'))
    .max(50, i18n.t('job_title_max_length')),
  code: Yup.string()
    .required(i18n.t('job_code_is_req'))
    .min(2, i18n.t('job_code_min_length'))
    .max(10, i18n.t('job_code_max_length')),
  job_description: Yup.string().max(100, i18n.t('job_description_max_length')),
  responsibilityDescription: Yup.string().max(
    1000,
    i18n.t('responsibility_description_is_req')
  ),
  neededCourses: Yup.array()
    .min(1, i18n.t('job_courses_is_req'))
    .required(i18n.t('job_courses_is_req')),
  neededFields: Yup.array()
    .min(1, i18n.t('job_fields_is_req'))
    .required(i18n.t('job_fields_is_req')),
  positionDegree: Yup.string().required(i18n.t('position_degree_is_req')),
  jobStatus: Yup.string().required(i18n.t('job_status_is_req')),
  jobLevel: Yup.string().required(i18n.t('job_level_is_req')),
  organizationUnit: Yup.string().required(i18n.t('organization_unit_is_req'))
});

export default validationSchema;
