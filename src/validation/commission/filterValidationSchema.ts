import * as Yup from 'yup';

export const filterValidationSchema = Yup.object().shape({
  assetNumber: Yup.string(),
  submitNumber: Yup.string(),
  submitAt: Yup.string(),
  date: Yup.string(),
  submitter: Yup.string(),
  submitterUnit: Yup.string(),
  description: Yup.string(),
  category: Yup.string(),
  status: Yup.string(),
}); 