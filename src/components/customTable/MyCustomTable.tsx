import { MaterialReactTable } from 'material-react-table';
import { i18n } from 'src/i18n';

function MyCustomTable({
  data,
  columns,
  enableRowActions = false,
  enablePagination = false,
  enableRowNumbers = false,
  enableColumnActions = false,
  enableHiding = true,
  enableFilters = true,
  isLoading = false,
  rowActions = undefined
}: {
  data: object[];
  columns: any[];
  enableRowActions?: boolean;
  enablePagination?: boolean;
  enableRowNumbers?: boolean;
  enableColumnActions?: boolean;
  enableHiding?: boolean;
  enableFilters?: boolean;
  isLoading?: boolean;
  rowActions?: any;
}) {
  return (
    <MaterialReactTable
      positionActionsColumn={'last'}
      displayColumnDefOptions={{
        'mrt-row-actions': {
          size: 100
        }
      }}
      muiTableBodyCellProps={{
        sx: {
          textAlign: 'right'
        }
      }}
      renderRowActions={rowActions}
      enableColumnActions={enableColumnActions}
      enableRowNumbers={enableRowNumbers}
      enableRowActions={enableRowActions}
      enablePagination={enablePagination}
      enableFullScreenToggle={false}
      enableDensityToggle={false}
      enableHiding={enableHiding}
      enableFilters={enableFilters}
      data={data}
      columns={columns}
      state={{ isLoading: isLoading }}
      localization={{
        actions: i18n.t('operation'),
        rowNumber: i18n.t('row_number'),
        showHideSearch: i18n.t('show_hide_search'),
        showHideFilters: i18n.t('show_hide_filters')
      }}
    />
  );
}

export default MyCustomTable;
