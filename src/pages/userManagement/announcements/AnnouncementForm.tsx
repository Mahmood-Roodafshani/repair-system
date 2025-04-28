import { Grid, Typography } from '@mui/material';
import { FormikErrors } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-multi-date-picker';
import { i18n } from 'src/localization';
import { AnnouncementRequestType } from 'src/types/requests/userManagement/announcements/announcementRequestType';
import { TextFieldFormik } from '@/components/form';
import { CKEditorToolbar } from 'src/utils/helper';
import { Editor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function AnnouncementForm({
    announcementRequest,
    setAnnouncementRequest,
    errors
}: {
    announcementRequest: AnnouncementRequestType;
    setAnnouncementRequest: Dispatch<SetStateAction<AnnouncementRequestType>>;
    errors: FormikErrors<AnnouncementRequestType>;
}) {
    const handleEditorChange = (_: unknown, editor: typeof ClassicEditor) => {
        setAnnouncementRequest((prevValues) => ({
            ...prevValues,
            message: editor.getData()
        }));
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextFieldFormik
                        name="title"
                        label={i18n.t('title')}
                        value={announcementRequest.title}
                        onChange={(e) => {
                            setAnnouncementRequest((prevValues) => ({
                                ...prevValues,
                                title: e.target.value
                            }));
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DatePicker
                        value={announcementRequest.from}
                        placeholder={i18n.t('from')}
                        onChange={(e) => {
                            setAnnouncementRequest((prevValues) => ({
                                ...prevValues,
                                from: e ? e.toString() : undefined
                            }));
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DatePicker
                        value={announcementRequest.to}
                        placeholder={i18n.t('to')}
                        onChange={(e) => {
                            setAnnouncementRequest((prevValues) => ({
                                ...prevValues,
                                to: e ? e.toString() : undefined
                            }));
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Editor
                        editor={ClassicEditor}
                        config={{
                            toolbar: CKEditorToolbar
                        }}
                        data={announcementRequest.message}
                        onChange={handleEditorChange}
                    />
                </Grid>
            </Grid>

            {errors.message && (
                <Typography color="error">{errors.message}</Typography>
            )}
        </>
    );
}

export default AnnouncementForm;
