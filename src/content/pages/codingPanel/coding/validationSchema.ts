import { i18n } from 'src/i18n';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  childName: Yup.string().required(i18n.t('child_name_is_req')),
  parentName: Yup.string().required(i18n.t('parent_name_is_req')),
  priority: Yup.number()
    .required(i18n.t('priority_is_req'))
    .min(1, i18n.t('priority_min'))
    .max(10000, i18n.t('priority_max'))
});

export default validationSchema;
