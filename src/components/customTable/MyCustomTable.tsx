import { Grid, useTheme } from '@mui/material';
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
  rowActions = undefined,
  caption = undefined
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
  caption?: string;
}) {
  const theme = useTheme();

  return (
    <>
      {caption && (
        <Grid
          display={'flex'}
          flexDirection={'row'}
          width={'100%'}
          justifyContent={'center'}
          sx={{
            padding: '10px',
            color: theme.colors.alpha.white[100],
            backgroundColor: theme.colors.primary.dark,
            borderRadius: '7px 7px 0 0'
          }}
        >
          {caption}
        </Grid>
      )}
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
        enableColumnResizing={false}
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
    </>
  );
}

export default MyCustomTable;
