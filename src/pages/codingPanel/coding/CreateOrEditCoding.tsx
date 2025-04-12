import {Grid} from '@mui/material';
import {Form, Formik, FormikHelpers} from 'formik';
import {toast} from 'react-toastify';
import {CustomRichTreeView, InlineLoader} from 'src/components';
import {i18n} from 'src/localization';
import {Button, ButtonType, TextFieldFormik} from '@/components/form';
import {createCoding, updateCoding} from 'src/services';
import {CodingResponse, RichViewType} from 'src/types';
import {findItemById, mapAllIdsInNestedArray} from 'src/utils/helper';
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
        if (res.statusCode === 200) {
            toast(
                existForm
                    ? i18n.t('coding_updated').toString()
                    : i18n.t('coding_created').toString(),
                {type: 'success'}
            );
            onSuccess();
        }
        onClose();
    };

    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={
                existForm
                    ? {
                        parentName: findItemById(treeView, existForm.parentId.toString())
                            .label,
                        childName: existForm.name,
                        priority: existForm.priority,
                        parentId: existForm.parentId
                    }
                    : {
                        parentName: '',
                        childName: ''
                    }
            }
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
        >
            {({values, setValues, isSubmitting, submitForm}) => (
                <Form>
                    <Grid display={'flex'} flexDirection={'row'} gap={'40px'}>
                        <CustomRichTreeView
                            onSelectedItemsChange={(_, itemIds) => {
                                setValues({
                                    ...values,
                                    parentId: itemIds,
                                    parentName: findItemById(
                                        treeView,
                                        itemIds.replace('tree_view_', '')
                                    ).label
                                });
                            }}
                            defaultValue={
                                existForm && values.parentId === existForm.parentId
                                    ? ['tree_view_' + existForm.parentId]
                                    : undefined
                            }
                            items={mapAllIdsInNestedArray('tree_view_', treeView)}
                            label={i18n.t('choose_coding').toString()}
                        />
                        <Grid
                            display={'flex'}
                            flexDirection={'column'}
                            width={'300px'}
                            gap={'10px'}
                        >
                            <TextFieldFormik
                                name="parentName"
                                value={values.parentName}
                                disabled={true}
                                label={i18n.t('father_name').toString()}
                            />
                            <TextFieldFormik
                                name="childName"
                                label={i18n.t('child_name').toString()}
                            />
                            <TextFieldFormik
                                name="priority"
                                type="number"
                                label={i18n.t('show_priority').toString()}
                            />
                            {isSubmitting && <InlineLoader/>}
                            {!isSubmitting && (
                                <Grid
                                    display={'flex'}
                                    flexDirection={'row'}
                                    justifyContent={'space-between'}
                                >
                                    {existForm && (
                                        <Button
                                            buttonType={ButtonType.EDIT}
                                            showIcon={false}
                                            text={i18n.t('edit')}
                                            onClick={submitForm}
                                        />
                                    )}
                                    {!existForm && (
                                        <Button
                                            buttonType={ButtonType.CREATE}
                                            showIcon={false}
                                            text={i18n.t('create')}
                                            onClick={submitForm}
                                        />
                                    )}

                                    <Button
                                        buttonType={ButtonType.CLOSE}
                                        color="error"
                                        showIcon={false}
                                        text={i18n.t('close')}
                                        onClick={onClose}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default CreateOrEditCoding;
