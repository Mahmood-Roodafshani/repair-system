import { SvgIconComponent } from '@mui/icons-material';
import { useCallback } from 'react';
import Dropzone from 'react-dropzone';

function DropzoneArea({
  acceptedFiles,
  dropzoneText,
  dropzoneClass,
  clearOnUnmount,
  Icon,
  filesLimit,
  maxFileSize,
  onChange
}: {
  acceptedFiles?: string[];
  dropzoneText: string;
  dropzoneClass?: string;
  clearOnUnmount: boolean;
  Icon: SvgIconComponent;
  filesLimit?: number;
  maxFileSize?: number;
  onChange?: (file: any) => void;
}) {
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
        onChange && onChange(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  return (
    <Dropzone onDrop={onDrop} maxFiles={filesLimit} maxSize={maxFileSize}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>{dropzoneText}</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}

export default DropzoneArea;
