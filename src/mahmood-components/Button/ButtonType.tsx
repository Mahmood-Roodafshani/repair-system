import * as React from 'react';
import Icon from '../Icon/Icon';
import MaterialIconType from '../Icon/MaterialIconType';

export default class ButtonType {
  static readonly SEARCH = new ButtonType(
    <Icon type={MaterialIconType.SEARCH} />,
    null,
    'search'
  );

  static readonly CREATE = new ButtonType(
    <Icon type={MaterialIconType.ADD} />,
    null,
    'create'
  );

  static readonly SHOW_ALL = new ButtonType(
    <Icon type={MaterialIconType.AUTORENEW} />,
    null,
    'showAll'
  );

  static readonly ADD = new ButtonType(
    <Icon type={MaterialIconType.ADD} />,
    null,
    'add'
  );

  static readonly DELETE = new ButtonType(
    <Icon type={MaterialIconType.DELETE} />,
    null,
    'delete'
  );

  static readonly REPORT = new ButtonType(
    <Icon type={MaterialIconType.FILE_DOWNLOAD} />,
    null,
    'report'
  );

  static readonly SAVE = new ButtonType(
    <Icon type={MaterialIconType.SAVE} />,
    null,
    'save'
  );

  static readonly CREATEOREDIT = new ButtonType(
    <Icon type={MaterialIconType.EDIT} />,
    null,
    'create/edit'
  );

  static readonly EDIT = new ButtonType(
    <Icon type={MaterialIconType.EDIT} />,
    null,
    'edit'
  );

  static readonly DISPLAY = new ButtonType(
    <Icon type={MaterialIconType.VISIBILITY} />,
    null,
    'display'
  );

  static readonly PRINT = new ButtonType(
    <Icon type={MaterialIconType.PRINT} />,
    null,
    'print'
  );

  static readonly ACCEPT = new ButtonType(
    <Icon type={MaterialIconType.DONE} />,
    null,
    'ok'
  );

  static readonly REJECT = new ButtonType(
    <Icon type={MaterialIconType.CANCEL} />,
    null,
    'reject'
  );

  static readonly YES = new ButtonType(
    <Icon type={MaterialIconType.DONE} />,
    null,
    'yes'
  );

  static readonly NO = new ButtonType(
    <Icon type={MaterialIconType.CANCEL} />,
    null,
    'no'
  );

  static readonly CANCEL = new ButtonType(
    <Icon type={MaterialIconType.CANCEL} />,
    null,
    'cancel'
  );

  static readonly CLOSE = new ButtonType(
    <Icon type={MaterialIconType.CLOSE} />,
    null,
    'close'
  );

  static readonly DOWNLOAD = new ButtonType(
    <Icon type={MaterialIconType.FILE_DOWNLOAD} />,
    null,
    'download'
  );

  static readonly UPLOAD = new ButtonType(
    <Icon type={MaterialIconType.FILE_UPLOAD} />,
    null,
    'upload'
  );

  static readonly REFRESH = new ButtonType(
    <Icon type={MaterialIconType.REFRESH} />,
    null,
    'update'
  );

  static readonly CLEAR = new ButtonType(
    <Icon type={MaterialIconType.CLEAR_ALL} />,
    null,
    'clear'
  );

  static readonly UNDO = new ButtonType(
    <Icon type={MaterialIconType.UNDO} />,
    null,
    'cancel'
  );

  icon: React.ReactElement<typeof Icon>;

  text: string | React.ReactNode;

  defaultMessage: string | null;

  constructor(
    icon: React.ReactElement<typeof Icon>,
    text?: string | React.ReactNode,
    defaultMessage?: string
  ) {
    if (text != null && defaultMessage != null) {
      throw Error('Only one of "text" or "defaultMessage" is allowed');
    }
    if (text == null && defaultMessage == null) {
      throw Error('One of "text" or "defaultMessage" is required');
    }
    this.icon = icon;
    this.text = text;
    this.defaultMessage = defaultMessage ? defaultMessage : null;
  }
}
