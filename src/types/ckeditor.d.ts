declare module '@ckeditor/ckeditor5-build-classic' {
  const ClassicEditor: any;
  export = ClassicEditor;
}

declare module '@ckeditor/ckeditor5-react' {
  import { ReactNode } from 'react';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

  export interface CKEditorProps {
    editor: typeof ClassicEditor;
    data?: string;
    id?: string;
    onReady?: (editor: any) => void;
    onChange?: (event: any, editor: any) => void;
    onBlur?: (event: any, editor: any) => void;
    onFocus?: (event: any, editor: any) => void;
    disabled?: boolean;
    config?: any;
  }

  export const CKEditor: React.FC<CKEditorProps>;
} 