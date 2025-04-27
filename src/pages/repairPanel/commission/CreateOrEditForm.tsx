import {
  CustomDatePicker,
  DropzoneArea,
  InlineLoader,
  MyCustomTable
} from '@/components';
import {
  Button,
  ButtonType,
  SelectFormik,
  TextFieldFormik
} from '@/components/form';
import { i18n } from '@/localization';
import { createNewCommission, updateCommission } from '@/services';
import { CommissionFormDto } from '@/types/responses/commission/commissionDto';
import { CommissionMember } from '@/types/requests/repairPanel/commission/commissionMember';
import { CreateNewCommissionRequest } from '@/types/requests/repairPanel/commission/createNewCommissionRequest';
import createNewCommissionRequestInitialValues from '@/types/requests/repairPanel/commission/createNewCommissionRequest';
import { Grid, TextField } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { createNewCommissionValidationSchema } from './validationSchema';
import { CommissionFixDecisionOptions } from '@/constant';
import { useMemo, useState } from 'react';
import { CameraAltTwoTone } from '@mui/icons-material';

function CreateOrEditForm({
  selectedItemForEdit,
  onSuccess,
  onClose
}: {
  selectedItemForEdit?: CommissionFormDto;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [staffCode, setStaffCode] = useState<string | number>();
  const [members, setMembers] = useState<CommissionMember[]>([]);

  const onSubmit = async (
    values: CreateNewCommissionRequest,
    actions: FormikHelpers<CreateNewCommissionRequest>
  ) => {
    const res =
      selectedItemForEdit === undefined
        ? await createNewCommission(values)
        : await updateCommission({ id: selectedItemForEdit.id, form: values });
    actions.setSubmitting(false);
    if (res.statusCode === 200) {
      if (selectedItemForEdit === undefined)
        toast(i18n.t('commission_created'), { type: 'success' });
      onSuccess();
    }
  };

  const columns = useMemo(
    () => [
      {
        header: i18n.t('commission_member_info'),
        accessorKey: 'fullname'
      },
      {
        header: i18n.t('organization_job'),
        accessorKey: 'organizationJob'
      },
      {
        header: i18n.t('organization_grade'),
        accessorKey: 'organizationGrade'
      },
      {
        header: i18n.t('submitter'),
        accessorKey: 'submitter'
      }
    ],
    []
  );

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        initialValues={createNewCommissionRequestInitialValues}
        validationSchema={createNewCommissionValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
      >
        {({ isSubmitting, values, setValues, submitForm, errors }) => (
          <Form>
            <Grid display={'flex'} flexDirection={'column'} gap={'20px'}>
              <Grid
                display={'flex'}
                flexDirection={'row'}
                flexWrap={'wrap'}
                gap={'20px'}
              >
                <CustomDatePicker
                  label={i18n.t('commision_date')}
                  value={values.date}
                  onChange={(e) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      date: e
                    }));
                  }}
                  error={errors.date}
                />
                <TextFieldFormik
                  name="assetNumber"
                  label={i18n.t('asset_number').toString()}
                />
                <SelectFormik
                  name="decision"
                  options={CommissionFixDecisionOptions}
                  label={i18n.t('commision_decision').toString()}
                />
                <TextFieldFormik
                  name="description"
                  label={i18n.t('description').toString()}
                />
                <TextFieldFormik
                  type="number"
                  name="personalPay"
                  label={i18n.t('personal_pay').toString()}
                />
              </Grid>
              <Grid display={'flex'} flexDirection={'row'} gap={'20px'}>
                <TextField
                  sx={{ width: '250px' }}
                  name="staffCode"
                  type="number"
                  value={staffCode}
                  onChange={(e) => setStaffCode(e.target.value)}
                  placeholder={i18n.t('enter_staff_code')}
                  label={i18n.t('staff_code').toString()}
                />
                <Button
                  buttonType={ButtonType.SEARCH}
                  text={i18n.t('inquiry')}
                />
              </Grid>
              <MyCustomTable columns={columns} data={members} />
              <Grid width={'400px'}>
                <DropzoneArea
                  dropzoneText={i18n.t('add_attach')}
                  dropzoneClass={'cusorm-dropzone-container'}
                  clearOnUnmount={true}
                  Icon={CameraAltTwoTone}
                  filesLimit={1}
                  maxFileSize={5000000}
                  onChange={(e) =>
                    setValues((prevValues) => ({
                      ...prevValues,
                      attachFile: e
                    }))
                  }
                />
              </Grid>
            </Grid>
            {!isSubmitting && (
              <Grid mt={'10px'} mb={'10px'}>
                <Button
                  color="error"
                  onClick={onClose}
                  buttonType={ButtonType.CLOSE}
                />
                <Button
                  onClick={submitForm}
                  buttonType={ButtonType.ACCEPT}
                  showIcon={false}
                  text={i18n.t('submit')}
                />
              </Grid>
            )}
            {isSubmitting && <InlineLoader />}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreateOrEditForm;
