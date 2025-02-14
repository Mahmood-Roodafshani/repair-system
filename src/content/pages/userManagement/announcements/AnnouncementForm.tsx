import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Grid, Typography } from '@mui/material';
import { FormikErrors } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-multi-date-picker';
import { i18n } from 'src/i18n';
import { AnnouncementRequestType } from 'src/types';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { TextFieldFormik } from 'src/mahmood-components';

function AnnouncementForm({
  announcementRequest,
  setAnnouncementRequest,
  errors
}: {
  announcementRequest: AnnouncementRequestType;
  setAnnouncementRequest: Dispatch<SetStateAction<AnnouncementRequestType>>;
  errors: FormikErrors<AnnouncementRequestType>;
}) {
  const CKEditorToolbar = {
    toolbar: {
      items: [
        'heading',
        '|',
        'style',
        'bold',
        'italic',
        'strikethrough',
        'underline',
        'alignment',
        'fontColor',
        'fontSize',
        'fontFamily',
        'fontBackgroundColor',
        'highlight',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'uploadImage',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
      ]
    },
    image: {
      toolbar: [
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        '|',
        'linkImage',
        'toggleImageCaption',
        'imageTextAlternative',
        'imageResize'
      ]
    },
    table: {
      toolbar: ['tableProperties', 'tableColumnResize'],
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    }
  };

  return (
    <>
      <TextFieldFormik
        sx={{ width: '300px' }}
        name="title"
        label={i18n.t('title').toString()}
      />
      <Grid sx={{ width: '400px' }}>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          maxDate={new Date()}
          value={announcementRequest.from}
          placeholder={i18n.t('from')}
          onChange={(e) => {
            setAnnouncementRequest((prevValues) => ({
              ...prevValues,
              from: e
            }));
          }}
        />
      </Grid>
      <Grid sx={{ width: '400px' }}>
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          maxDate={new Date()}
          value={announcementRequest.to}
          placeholder={i18n.t('to')}
          onChange={(e) => {
            setAnnouncementRequest((prevValues) => ({
              ...prevValues,
              to: e
            }));
          }}
        />
      </Grid>
      <CKEditor
        editor={ClassicEditor}
        config={{
          //   extraPlugins: [MyCustomUploadAdapterPlugin],
          placeholder: i18n.t('ckeditor_placeholder').toString(),
          ...CKEditorToolbar
        }}
        data={announcementRequest?.message ? announcementRequest.message : ''}
        onChange={(event, editor) => {
          setAnnouncementRequest((prevValues) => ({
            ...prevValues,
            message: editor.getData()
          }));
        }}
      />

      {errors.message?.length > 0 && <Typography>{errors.message}</Typography>}
    </>
  );
}

export default AnnouncementForm;
