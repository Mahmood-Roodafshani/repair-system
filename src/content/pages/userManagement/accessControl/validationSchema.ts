import { i18n } from 'src/i18n';
import * as Yup from 'yup';

const filterListValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, i18n.t('firstname_min_length'))
    .max(50, i18n.t('firstname_max_length')),
  lastname: Yup.string()
    .min(2, i18n.t('firstname_min_length'))
    .max(50, i18n.t('firstname_max_length')),
  nationalCode: Yup.string().matches(
    /\\d{10}/,
    i18n.t('invalid_national_code')
  ),
  staffCode: Yup.string().matches(/\\d{3,20}/, i18n.t('invalid_staff_code'))
});

export { filterListValidationSchema };
