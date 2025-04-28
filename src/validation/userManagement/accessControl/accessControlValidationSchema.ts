import * as Yup from 'yup';

export const accessControlValidationSchema = Yup.object().shape({
  staffCode: Yup.string().required('Staff code is required'),
  grants: Yup.array().of(Yup.string()).min(1, 'At least one grant is required')
}); 