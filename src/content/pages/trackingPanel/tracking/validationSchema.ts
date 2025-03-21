import { i18n } from 'src/i18n';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  nationalCode: Yup.string().matches(
    /[0-9]{10}/,
    i18n.t('invalid_national_code')
  )
});

export default validationSchema;
