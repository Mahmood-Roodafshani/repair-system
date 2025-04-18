import { i18n } from 'src/localization';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  deliverer: Yup.string().matches(
    /^[0-9]{1,20}$/,
    i18n.t('invalid_staff_code')
  ),
  receiver: Yup.string().matches(/^[0-9]{1,20}$/, i18n.t('invalid_staff_code')),
  assetNumber: Yup.string().matches(
    /^[0-9]{1,20}$/,
    i18n.t('invalid_asset_number')
  )
});

export default validationSchema;
