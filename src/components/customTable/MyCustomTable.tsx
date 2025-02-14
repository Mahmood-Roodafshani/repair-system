import { MaterialReactTable } from 'material-react-table';

function MyCustomTable({
  data,
  columns,
  enableRowActions = false,
  enablePagination = false,
  enableRowNumbers = false,
  enableColumnActions = false,
  rowActions = undefined
}: {
  data: object[];
  columns: any[];
  enableRowActions?: boolean;
  enablePagination?: boolean;
  enableRowNumbers?: boolean;
  enableColumnActions?: boolean;
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
      data={data}
      columns={columns}
      localization={{
        actions: 'عملیات',
        rowNumber: 'ردیف',
        showHideSearch: 'نمایش/مخفی سازی جست و جو',
        showHideFilters: 'نمایش/مخفی سازی فیلترها'
      }}
    />
  );
}

export default MyCustomTable;
