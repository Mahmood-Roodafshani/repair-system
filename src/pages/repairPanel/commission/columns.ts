import { i18n } from '@/localization';

const commonColumns = [
  {
    header: i18n.t('commision_date'),
    accessorKey: 'date',
    size: 150
  },
  {
    header: i18n.t('commision_decision'),
    accessorKey: 'decision',
    size: 200
  },
  {
    header: i18n.t('description'),
    accessorKey: 'description',
    size: 200
  },
  {
    header: i18n.t('asset_number'),
    accessorKey: 'assetNumber',
    size: 100
  },
  {
    header: i18n.t('item_category'),
    accessorKey: 'category',
    size: 120
  },
  {
    header: i18n.t('submit_at'),
    accessorKey: 'submitAt',
    size: 120
  },
  {
    header: i18n.t('submitter_info'),
    accessorKey: 'submitter',
    size: 120
  }
];

export default commonColumns;
