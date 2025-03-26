import { i18n } from 'src/i18n';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  staffCode: Yup.string().matches(/[0-9]{3,20}/, i18n.t('invalid_staff_code'))
  //   refCode: Yup.string()
});

export default validationSchema;
