import { Grid, useTheme } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { Dispatch, SetStateAction } from 'react';
import { i18n } from 'src/i18n';
import { Pagination } from 'src/types';

function MyCustomTable({
  data,
  columns,
  enableRowActions = false,
  enablePagination = false,
  enableRowNumbers = false,
  enableColumnActions = false,
  manualPagination = true,
  enableHiding = true,
  enableFilters = true,
  isLoading = false,
  rowActions = undefined,
  rowCount = undefined,
  caption = undefined,
  pagination = undefined,
  onPaginationChange = undefined,
  isRefetching = false
}: {
  data: object[];
  columns: any[];
  enableRowActions?: boolean;
  enablePagination?: boolean;
  enableRowNumbers?: boolean;
  enableColumnActions?: boolean;
  manualPagination?: boolean;
  enableHiding?: boolean;
  enableFilters?: boolean;
  isLoading?: boolean;
  rowActions?: any;
  rowCount?: number;
  caption?: string;
  pagination?: Pagination;
  onPaginationChange?: Dispatch<SetStateAction<Pagination>>;
  isRefetching?: boolean;
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
        manualPagination={manualPagination}
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
        state={
          manualPagination && pagination
            ? {
                isLoading: isLoading,
                pagination: pagination,
                showProgressBars: isRefetching
              }
            : { isLoading: isLoading, showProgressBars: isRefetching }
        }
        onPaginationChange={manualPagination ? onPaginationChange : undefined}
        rowCount={rowCount}
        localization={{
          actions: i18n.t('operation'),
          rowNumber: i18n.t('row_number'),
          showHideSearch: i18n.t('show_hide_search'),
          showHideFilters: i18n.t('show_hide_filters'),
          rowsPerPage: i18n.t('row_per_page'),
          goToNextPage: i18n.t('go_to_next_page'),
          goToPreviousPage: i18n.t('go_to_prev_page'),
          of: i18n.t('of')
        }}
      />
    </>
  );
}

export default MyCustomTable;
