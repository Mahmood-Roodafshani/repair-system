import {Grid} from '@mui/material';
import {Form, Formik, FormikHelpers} from 'formik';
import {toast} from 'react-toastify';
import {CustomRichTreeView, InlineLoader} from 'src/components';
import {i18n} from 'src/localization';
import {Button, ButtonType, TextFieldFormik} from '@/components/form';
import {createCoding, updateCoding} from 'src/services';
import {CodingResponse, RichViewType} from 'src/types';
import {findItemById} from 'src/utils/helper';
import {NewCodingType} from './newCodingType';
import validationSchema from './validationSchema';

function CreateOrEditCoding({
                                treeView,
                                existForm,
                                onClose,
                                onSuccess
                            }: {
    treeView: RichViewType[];
    existForm?: CodingResponse;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const onSubmit = async (
        values: NewCodingType,
        actions: FormikHelpers<NewCodingType>
    ) => {
        const res = existForm
            ? await updateCoding({
                id: existForm.id,
                data: {
                    parentId: values.parentId,
                    childName: values.childName,
                    priority: values.priority
                }
            })
            : await createCoding({
                parentId: values.parentId,
                childName: values.childName,
                priority: values.priority
            });
        actions.setSubmitting(false);
        if ('statusCode' in res && res.statusCode === 200) {
            toast(
                existForm
                    ? i18n.t('coding_updated').toString()
                    : i18n.t('coding_created').toString(),
                {type: 'success'}
            );
            onSuccess();
        }
    };

    const initialValues: NewCodingType = {
        parentName: existForm ? findItemById(treeView, existForm.parentId.toString())?.label ?? '' : '',
        childName: existForm?.name ?? '',
        priority: existForm?.priority ?? 1,
        parentId: existForm?.parentId ?? ''
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({isSubmitting, setFieldValue, values}) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomRichTreeView
                                items={treeView}
                                defaultValue={values.parentId ? ['tree_view_' + values.parentId] : undefined}
                                onSelectedItemsChange={(_, itemIds) => {
                                    if (typeof itemIds === 'string') {
                                        const cleanId = itemIds.replace('tree_view_', '');
                                        const item = findItemById(treeView, cleanId);
                                        setFieldValue('parentId', cleanId);
                                        setFieldValue('parentName', item?.label ?? '');
                                    }
                                }}
                                label={i18n.t('choose_coding').toString()}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldFormik
                                name="childName"
                                label={i18n.t('child_name')}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldFormik
                                name="priority"
                                label={i18n.t('priority')}
                                type="number"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                buttonType={existForm ? ButtonType.EDIT : ButtonType.CREATE}
                                text={existForm ? i18n.t('edit') : i18n.t('create')}
                                disabled={isSubmitting}
                                sx={{marginRight: '10px'}}
                            />
                            <Button
                                buttonType={ButtonType.CLOSE}
                                text={i18n.t('close')}
                                onClick={onClose}
                            />
                        </Grid>
                    </Grid>
                    {isSubmitting && <InlineLoader />}
                </Form>
            )}
        </Formik>
    );
}

export default CreateOrEditCoding;
