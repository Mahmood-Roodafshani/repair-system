import { i18n } from 'src/localization';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required(i18n.t('username_is_required'))
    .min(3, i18n.t('username_min_length')),
  codingName: Yup.string()
    .required(i18n.t('coding_name_is_required'))
});

export default validationSchema;
