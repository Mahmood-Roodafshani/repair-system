import { Grid, Typography } from '@mui/material';
import { FormikErrors } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { i18n } from 'src/localization';
import { AnnouncementRequestType } from '../../../types/requests/userManagement/announcements/announcementRequestType';
import { TextFieldFormik } from '@/components/form';
import { CKEditorToolbar } from 'src/utils/helper';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface AnnouncementFormProps {
    announcementRequest: AnnouncementRequestType;
    setAnnouncementRequest: Dispatch<SetStateAction<AnnouncementRequestType>>;
    errors: FormikErrors<AnnouncementRequestType>;
}

function AnnouncementForm({
    announcementRequest,
    setAnnouncementRequest,
    errors
}: AnnouncementFormProps) {
    const handleEditorChange = (_: unknown, editor: typeof ClassicEditor) => {
        setAnnouncementRequest((prevValues: AnnouncementRequestType) => ({
            ...prevValues,
            message: editor.getData()
        }));
    };

    const handleDateChange = (field: 'from' | 'to') => (date: DateObject | DateObject[] | null) => {
        if (date instanceof DateObject) {
            setAnnouncementRequest((prevValues: AnnouncementRequestType) => ({
                ...prevValues,
                [field]: date.format()
            }));
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextFieldFormik
                        name="title"
                        label={i18n.t('title')}
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DatePicker
                        value={announcementRequest.from}
                        placeholder={i18n.t('from')}
                        onChange={handleDateChange('from')}
                        format="YYYY-MM-DD"
                        calendarPosition="bottom-right"
                        style={{ width: '100%' }}
                    />
                    {errors.from && (
                        <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                            {errors.from}
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DatePicker
                        value={announcementRequest.to}
                        placeholder={i18n.t('to')}
                        onChange={handleDateChange('to')}
                        format="YYYY-MM-DD"
                        calendarPosition="bottom-right"
                        style={{ width: '100%' }}
                    />
                    {errors.to && (
                        <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                            {errors.to}
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <CKEditor
                        editor={ClassicEditor}
                        data={announcementRequest.message}
                        onChange={handleEditorChange}
                        config={{
                            toolbar: CKEditorToolbar
                        }}
                    />
                    {errors.message && (
                        <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                            {errors.message}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </>
    );
}

export default AnnouncementForm;
