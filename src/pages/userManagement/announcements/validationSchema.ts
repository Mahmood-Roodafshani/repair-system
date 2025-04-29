import * as Yup from 'yup';
import { i18n } from 'src/localization';

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required(i18n.t('title_is_req'))
    .min(2, i18n.t('title_min_length'))
    .max(100, i18n.t('title_max_length')),
  message: Yup.string()
    .required(i18n.t('message_is_req'))
    .min(10, i18n.t('message_min_length')),
  from: Yup.string()
    .required(i18n.t('from_is_req'))
    .test('is-valid-date', i18n.t('invalid_date'), (value) => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    }),
  to: Yup.string()
    .required(i18n.t('to_is_req'))
    .test('is-valid-date', i18n.t('invalid_date'), (value) => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    })
    .test('is-after-from', i18n.t('to_must_be_after_from'), function(value) {
      const from = this.parent.from;
      if (!from || !value) return true;
      return new Date(value) >= new Date(from);
    })
});
