import * as Yup from 'yup';

export const manageGrantsValidationSchema = Yup.object().shape({
  grants: Yup.array().of(Yup.string()).min(1, 'At least one grant is required')
}); 