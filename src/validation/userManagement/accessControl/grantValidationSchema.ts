import * as Yup from 'yup';

export const grantValidationSchema = Yup.object().shape({
  userId: Yup.string().required('User ID is required'),
  grants: Yup.array().of(Yup.string()).min(1, 'At least one grant is required')
}); 