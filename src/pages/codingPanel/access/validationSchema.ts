import { i18n } from 'src/localization';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  nationalCode: Yup.string()
    .required(i18n.t('national_code_is_req'))
    .matches(/[0-9]{10}/, i18n.t('invalid_national_code')),
  codingId: Yup.string().required(i18n.t('coding_name_is_req'))
});

export default validationSchema;
