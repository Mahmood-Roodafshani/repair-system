import { useCallback } from 'react';
import Dropzone from 'react-dropzone';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface DropzoneAreaProps {
  dropzoneText: string;
  filesLimit?: number;
  maxFileSize?: number;
  onChange?: (file: any) => void;
  acceptedFiles?: string[];
  dropzoneClass?: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

function DropzoneArea({
  dropzoneText,
  filesLimit,
  maxFileSize,
  onChange,
  acceptedFiles,
  dropzoneClass,
  Icon
}: DropzoneAreaProps) {
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const binaryStr = reader.result;
        onChange && onChange(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, [onChange]);

  return (
    <Dropzone 
      onDrop={onDrop} 
      maxFiles={filesLimit} 
      maxSize={maxFileSize}
      accept={acceptedFiles ? acceptedFiles.reduce((acc, curr) => ({...acc, [curr]: []}), {}) : undefined}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()} className={dropzoneClass}>
            <input {...getInputProps()} />
            {Icon && <Icon />}
            <p>{dropzoneText}</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}

export default DropzoneArea;
