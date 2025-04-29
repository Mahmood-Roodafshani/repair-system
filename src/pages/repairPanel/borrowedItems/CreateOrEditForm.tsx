import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import { RichViewType } from 'src/types';
import { i18n } from 'src/localization';
import { CustomRichTreeView } from 'src/components';
import { OpGrid } from 'src/components';
import { InlineLoader } from 'src/components';
import { useNavigate } from 'react-router';

type CreateOrEditFormProps = {
  initialValues: {
    title?: string;
    id?: string | number;
    borrowerName?: string;
    borrowDate?: string;
    returnDate?: string;
    organizationUnit?: string;
    itemCategory?: string;
  };
  organizationUnits: RichViewType[];
  itemCategories: RichViewType[];
  onSuccess: () => void;
  onClose: () => void;
};

function CreateOrEditForm({
  initialValues,
  organizationUnits,
  itemCategories,
  onSuccess,
  onClose
}: CreateOrEditFormProps) {
  const navigate = useNavigate();

  const onSubmit = async (values: typeof initialValues) => {
    try {
      // TODO: Implement create/update API call
      onSuccess();
      onClose();
    } catch (error) {
      // TODO: Handle error
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {initialValues.id ? i18n.t('edit_borrowed_item') : i18n.t('new_borrowed_item')}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ submitForm, resetForm, isSubmitting }) => (
            <Form>
              <Grid display={'flex'} flexDirection={'column'} gap={'30px'}>
                {organizationUnits.length > 0 && (
                  <CustomRichTreeView
                    onSelectedItemsChange={(_, itemIds) =>
                      submitForm()
                    }
                    label={i18n.t('organization_unit')}
                    items={organizationUnits}
                    sx={{ width: '500px' }}
                  />
                )}

                {itemCategories.length > 0 && (
                  <CustomRichTreeView
                    onSelectedItemsChange={(_, itemIds) =>
                      submitForm()
                    }
                    label={i18n.t('item_category')}
                    items={itemCategories}
                    sx={{ width: '500px' }}
                  />
                )}

                {isSubmitting && <InlineLoader />}
                {!isSubmitting && (
                  <OpGrid
                    onClose={() => navigate('/repair-panel')}
                    onCreateOrEdit={submitForm}
                    createOrEditLabel={i18n.t('save')}
                    onSearch={submitForm}
                    onClear={resetForm}
                  />
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default CreateOrEditForm; 