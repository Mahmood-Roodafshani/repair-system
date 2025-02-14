// import React, {useEffect, useRef, useState} from 'react';
// import MaterialReactTable, {MaterialReactTableProps, MRT_TableInstance} from 'material-react-table';
// import type {ColumnFiltersState, PaginationState, SortingState} from '@tanstack/react-table';
// import {RowSelectionState} from "@tanstack/react-table";
// import {MRT_Localization_FA} from "material-react-table/locales/fa";
//
// export type DataTableResponse<T> = {
//     totalCount: number;
//     data: Array<T>;
// };
//
// export type TableHeader<T> = {
//     accessorKey: /*DeepKeys<T>|*/string;
//     header: string;
// }
//
// export type DataTableRequest<T> = {
//     start: string,
//     size: string,
//     sorting: SortingState,
//     request: T
// };
//
// interface ExampleParams<T extends Record<string, any> = {}> extends Partial<Omit<MaterialReactTableProps, 'columns' | 'data'>> {
//     filter: any;
//     showRowCount?: boolean;
//     showColumnSeparator?: boolean;
//     coloredHeader?: boolean;
//     resetPagination?: boolean;
//     hideBottomToolbar?: boolean;
//     hideTopToolbar?: boolean;
//     onRowSelectCustom?: (selected: any[]) => void,
//     columns: any;//MRT_ColumnDef<T>[];//TableHeader<T>[]; TODO
//     data: ((optionalParams: DataTableRequest<any>) => Promise<DataTableResponse<T>> | T[]) | T[]
// }
//
// const DataTable = <T extends Record<string, any> = {}>(props: ExampleParams<T>) => {
//     //localData and fetching state
//     const {showRowCount = false,resetPagination = false, showColumnSeparator = true,enableSorting=false, hideTopToolbar = false, hideBottomToolbar = false, coloredHeader = true, onRowSelectCustom = (i) => i, columns, data, filter, ...otherProps} = props;
//     const [localData, setLocalData] = useState<T[]>([]);
//     const [isError, setIsError] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isRefetching, setIsRefetching] = useState(false);
//     const [rowCount, setRowCount] = useState(0);
//
//     //table state
//     const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//     const [globalFilter, setGlobalFilter] = useState('');
//     const [sorting, setSorting] = useState<SortingState>([]);
//     const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
//     const [pagination, setPagination] = useState<PaginationState>({
//         pageIndex: 0,
//         pageSize: 10,
//     });
//
//     const ref = useRef<MRT_TableInstance<T> | undefined>();
//
//     const resetState = () => {
//         setLocalData([]);
//         setIsError(false);
//         setIsLoading(false);
//         setIsRefetching(false);
//         setRowCount(0);
//         setColumnFilters([]);
//         setGlobalFilter('');
//         setSorting([]);
//         setPagination({
//             pageIndex: 0,
//             pageSize: 10,
//         });
//     }
//
//
//     const fetchData = async () => {
//         if (!localData.length) {
//             setIsLoading(true);
//         } else {
//             setIsRefetching(true);
//         }
//         // @ts-ignore
//         if (props.filter == null) {
//             setLocalData([]);
//             setIsError(false);
//             setIsLoading(false);
//             setIsRefetching(false);
//         }
//         if (resetPagination){
//             setPagination({
//                 pageIndex: 0,
//                 pageSize: 10,
//             });
//         }
//         // @ts-ignore
//         if (props.data != null && typeof props.data === 'function' /*&& typeof props.localData.then === 'function'*/) {
//             const optionalParams : DataTableRequest<T> = {
//                 start: `${pagination.pageIndex * pagination.pageSize}`,
//                 size: `${pagination.pageSize}`,
//                 // filters: JSON.stringify(columnFilters ?? []),
//                 // globalFilter: globalFilter ?? '',
//                 sorting: sorting ?? [],
//
//                 request: {} as T
//             };
//             setIsLoading(true);
//             const promise = ((props.data as ((optionalParams: DataTableRequest<T>) => Promise<DataTableResponse<T>>))(optionalParams)).then((response: DataTableResponse<T>) => {
//                 setLocalData(response.data);
//                 setRowCount(response.totalCount);
//                 setIsError(false);
//                 setIsLoading(false);
//                 setIsRefetching(false);
//             }).catch(error => {
//                 setIsError(true);
//                 setIsLoading(false);
//                 setIsRefetching(false);
//                 console.error(error);
//             }).finally(() => {
//                 setIsError(false);
//                 setIsLoading(false);
//                 setIsRefetching(false);
//             });
//             await promise;
//         } else {
//             setLocalData(props.data as []);
//             setIsError(false);
//             setIsLoading(false);
//             setIsRefetching(false);
//         }
//     };
//
//
//     useEffect(() => {
//         // resetState();
//         fetchData();
//     }, [
//         props.filter,
//         // columnFilters,
//         // globalFilter,
//         pagination.pageIndex,
//         pagination.pageSize,
//         sorting,
//     ]);
//
//     let customProps = {};
//     let tableState:{state:{}} = {state:{}};
//
//     if (props.data != null && typeof props.data === 'function') {
//         customProps = {
//             ...customProps,
//             manualFiltering: true,
//             manualPagination: true,
//             manualSorting: true,
//             onColumnFiltersChange: setColumnFilters,
//             onGlobalFilterChange: setGlobalFilter,
//             onPaginationChange: setPagination,
//             onSortingChange: setSorting,
//             rowCount: rowCount,
//         }
//         tableState = {
//             state: {
//                 ...tableState.state,
//                 // columnFilters,
//                 pagination,
//                 // globalFilter,
//                 isLoading,
//                 showAlertBanner: isError,
//                 showProgressBars: isRefetching,
//                 sorting,
//             }
//         }
//     }
//
//     if (showRowCount) {
//         customProps = {
//             ...customProps,
//             enableRowNumbers: true,
//             rowNumberMode: "original"
//
//         }
//     }
//
//     if (hideBottomToolbar) {
//         customProps = {
//             ...customProps,
//             renderBottomToolbar: () => null,
//         }
//     }
//
//     if (hideTopToolbar) {
//         customProps = {
//             ...customProps,
//             renderTopToolbar: () => null,
//         }
//     }
//
//     if (showColumnSeparator || coloredHeader) {
//         customProps = {
//             ...customProps,
//             muiTableBodyCellProps: showColumnSeparator && {
//                 sx: {
//                     borderRight: '1px solid rgba(224,224,224,1)',
//                 },
//             },
//             muiTableHeadCellProps: {
//                 sx: (theme: any) => ({
//                     borderRight: showColumnSeparator ? '1px solid rgba(224,224,224,1)' : null,
//                     backgroundColor: coloredHeader ? theme.palette.primary.light : '',
//                 }),
//             }
//
//         }
//     }
//
//     if (props.onRowSelectCustom) {
//         customProps = {
//             ...customProps,
//             onRowSelectionChange: setRowSelection,
//             enableRowSelection: true,
//
//         }
//         tableState = {
//             state: {
//                 ...tableState.state,
//                 rowSelection,
//             }
//         }
//     }
//
//     const tableInstanceRef = useRef<MRT_TableInstance<{}>>(null);
//
//     useEffect(() => {
//         // @ts-ignore
//         onRowSelectCustom(Object.keys(rowSelection).map(item => {
//             // @ts-ignore
//             return tableInstanceRef.current.getRow(item).original;
//
//         }));
//         // (rowSelection as object).
//     }, [rowSelection]);
//
//     return <MaterialReactTable
//         tableInstanceRef={tableInstanceRef}
//         enableColumnActions={false}
//         enableColumnFilters={false}
//         localization={MRT_Localization_FA}
//         enableGlobalFilter={false}
//
//         columns={/*useMemo<MRT_ColumnDef<T>[]>(
//                     () => columns,
//                     [],
//                 )*/columns}
//         data={localData}
//         muiToolbarAlertBannerProps={
//             isError
//                 ? {
//                     color: 'error',
//                     children: 'Error loading localData',
//                 }
//                 : undefined
//         }
//         enableSorting={enableSorting}
//         {...customProps}
//         {...tableState}
//         {...otherProps}
//
//     />;
// };
//
// export default DataTable;

function DataTable() {
  return <></>;
}

export default DataTable;
