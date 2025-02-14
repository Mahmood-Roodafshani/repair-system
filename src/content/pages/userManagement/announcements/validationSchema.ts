import * as Yup from 'yup';
import { i18n } from 'src/i18n';

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required(i18n.t('title_is_req'))
    .min(2, i18n.t('title_min_length'))
    .max(50, i18n.t('title_max_length')),
  message: Yup.string()
    .required(i18n.t('message_is_req'))
    .min(2, i18n.t('message_min_length'))
    .max(50, i18n.t('message_max_length')),
  from: Yup.string().required(i18n.t('from_is_req')),
  to: Yup.string().required(i18n.t('to_is_req'))
});
