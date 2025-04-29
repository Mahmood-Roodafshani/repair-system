import { Grid, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  CustomRichTreeView,
  InlineLoader,
  Loader,
  MyCustomTable,
  OpGrid,
  TableRowAction
} from 'src/components';
import { i18n } from 'src/localization';
import { ConfirmationDialog } from '@/components/form';
import {
  getBorrowedItemsList,
  removeBorrowedItem
} from 'src/services/repairPanel/borrowedItemsService';
import CommonService from 'src/services/CommonService';
import { BorrowedItemsResponse } from 'src/types/responses/repairPanel/borrowedItemsResponse';
import { RichViewType } from 'src/types';
import CreateOrEditForm from './CreateOrEditForm';

type FormFilter = {
  organizationUnits?: string[];
};

interface TableRow {
  index: number;
  original: BorrowedItemsResponse;
}

function BorrowedItems() {
  const [data, setData] = useState<BorrowedItemsResponse[]>([]);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState<BorrowedItemsResponse>();
  const [selectedItemIdForDelete, setSelectedItemIdForDelete] = useState<string | number>();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [organizationUnits, setOrganizationUnits] = useState<RichViewType[]>([]);
  const [itemCategories, setItemCategories] = useState<RichViewType[]>([]);
  const [selectedOrganizationUnit, setSelectedOrganizationUnit] = useState<string>();

  const columns = useMemo(
    () => [
      {
        header: i18n.t('row_number'),
        enableHiding: false,
        Cell: ({ row }: { row: TableRow }) => {
          return (
            <Typography sx={{ textAlign: 'right' }} key={'row_' + row.index}>
              {row.index + 1}
            </Typography>
          );
        },
        size: 40
      },
      {
        header: i18n.t('item_name'),
        accessorKey: 'itemName',
        size: 150
      },
      {
        header: i18n.t('borrower_name'),
        accessorKey: 'borrowerName',
        size: 100
      },
      {
        header: i18n.t('borrow_date'),
        accessorKey: 'borrowDate',
        size: 120
      },
      {
        header: i18n.t('return_date'),
        accessorKey: 'returnDate',
        size: 120
      }
    ],
    []
  );

  useEffect(() => {
    setLoading(true);
    CommonService.getOrganizationUnits()
      .then((res) => {
        setOrganizationUnits(res);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    CommonService.getItemCategoryFields()
      .then((res) => {
        setItemCategories(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (
    values: FormFilter,
    actions: FormikHelpers<FormFilter>
  ) => {
    try {
      const res = await getBorrowedItemsList({
        organizationUnit:
          values.organizationUnits && values.organizationUnits.length > 0
            ? values.organizationUnits[0]
            : undefined
      });
      actions.setSubmitting(false);
      if (res.statusCode === 200) {
        setData(res.content);
        setSelectedOrganizationUnit(values.organizationUnits?.[0]);
      }
    } catch (error) {
      actions.setSubmitting(false);
      toast.error(i18n.t('error_occurred').toString());
    }
  };

  return (
    <>
      <Helmet>
        <title>{i18n.t('borrowed_items').toString()}</title>
      </Helmet>
      {!selectedItemForEdit && !showCreateForm && (
        <Grid display={'flex'} flexDirection={'column'} gap={'20px'}>
          <Formik
            onSubmit={onSubmit}
            initialValues={{ organizationUnit: undefined }}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
          >
            {({ setValues, isSubmitting, submitForm, resetForm }) => (
              <Form>
                <Grid display={'flex'} flexDirection={'column'} gap={'30px'}>
                  {organizationUnits.length > 0 && (
                    <CustomRichTreeView
                      onSelectedItemsChange={(_, itemIds) =>
                        setValues((prevValues) => ({
                          ...prevValues,
                          organizationUnit: itemIds[0]
                        }))
                      }
                      label={i18n.t('organization_unit')}
                      items={organizationUnits}
                      sx={{ width: '500px' }}
                    />
                  )}

                  {isSubmitting && <InlineLoader />}
                  {!isSubmitting && (
                    <OpGrid
                      onClose={() => navigate('/repair-panel')}
                      onCreateOrEdit={() => setShowCreateForm(true)}
                      createOrEditLabel={i18n.t('new_borrowed_item')}
                      onSearch={submitForm}
                      onClear={resetForm}
                    />
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
          {data.length > 0 && (
            <MyCustomTable
              enableRowActions={true}
              rowActions={({
                row
              }: {
                row: { original: { id: string | number } };
              }) => (
                <TableRowAction
                  onEdit={() =>
                    setSelectedItemForEdit(
                      data.find((e) => e.id === row.original.id)
                    )
                  }
                  onDelete={() => setSelectedItemIdForDelete(row.original.id)}
                />
              )}
              data={data}
              columns={columns}
            />
          )}
          <ConfirmationDialog
            id="remove_modal"
            open={selectedItemIdForDelete !== undefined}
            onClose={() => setSelectedItemIdForDelete(undefined)}
            closeOnEsc={true}
            dialogTitle={i18n.t('confirm_remove')}
            dialogOkBtnAction={() => {
              if (!selectedItemIdForDelete) return;
              setLoading(true);
              removeBorrowedItem({ id: selectedItemIdForDelete })
                .then((res) => {
                  if (res.statusCode === 200) {
                    setData(data.filter((e) => e.id !== selectedItemIdForDelete));
                    toast.success(i18n.t('item_removed').toString());
                  }
                })
                .finally(() => setLoading(false));
            }}
          />
        </Grid>
      )}

      {(selectedItemForEdit || showCreateForm) && (
        <CreateOrEditForm
          initialValues={
            showCreateForm
              ? {}
              : selectedItemForEdit
              ? {
                  title: selectedItemForEdit.itemName,
                  id: selectedItemForEdit.id,
                  borrowerName: selectedItemForEdit.borrowerName,
                  borrowDate: selectedItemForEdit.borrowDate,
                  returnDate: selectedItemForEdit.returnDate,
                  organizationUnit: selectedItemForEdit.organizationUnit,
                  itemCategory: selectedItemForEdit.itemCategory
                }
              : {}
          }
          organizationUnits={organizationUnits}
          itemCategories={itemCategories}
          onSuccess={async () => {
            setLoading(true);
            const res = await getBorrowedItemsList({
              organizationUnit: selectedOrganizationUnit
            });
            setLoading(false);
            if (res.statusCode === 200) setData(res.content);
          }}
          onClose={() => {
            setSelectedItemForEdit(undefined);
            setShowCreateForm(false);
          }}
        />
      )}
      {loading && <Loader />}
    </>
  );
}

export default BorrowedItems;
