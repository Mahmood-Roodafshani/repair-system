import { i18n } from 'src/localization';
import * as Yup from 'yup';

const fetchCommissionListValidationSchema = Yup.object().shape({
  assetNumber: Yup.string().matches(
    /^[0-9]{1,20}$/,
    i18n.t('invalid_asset_number')
  )
});

const fetchItemsInCommissionQueueValidationSchema = Yup.object().shape({
  assetNumber: Yup.string().matches(
    /^[0-9]{1,20}$/,
    i18n.t('invalid_asset_number')
  )
});

const createNewCommissionValidationSchema = Yup.object().shape({
  assetNumber: Yup.string().matches(
    /^[0-9]{1,20}$/,
    i18n.t('invalid_asset_number')
  )
});

export {
  fetchCommissionListValidationSchema,
  fetchItemsInCommissionQueueValidationSchema,
  createNewCommissionValidationSchema
};
