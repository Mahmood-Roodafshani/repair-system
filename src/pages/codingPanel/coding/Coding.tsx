import { Grid, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Loader, MyCustomTable, TableRowAction } from 'src/components';
import { i18n } from 'src/localization';
import { Button, ButtonType, ConfirmationDialog } from '@/components/form';
import { fetchCodingList, removeCoding } from 'src/services';
import CommonService from 'src/services/CommonService';
import { CodingResponse, RichViewType } from 'src/types';
import CreateOrEditCoding from './CreateOrEditCoding';

function Coding() {
  const [data, setData] = useState<CodingResponse[]>();
  const [loading, setLoading] = useState(false);
  const [workLocations, setWorkLocations] = useState<RichViewType[]>();
  const [selectedCodingForEdit, setSelectedCodingForEdit] = useState<
    string | number
  >();
  const [selectedCodingForDelete, setSelectedCodingForDelete] = useState<
    string | number
  >();
  const [showCreateOrEditForm, setShowCreateOrEditForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchCodingList()])
      .then((res) => {
        if (res[0].statusCode === 200) setData(res[0].content);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!showCreateOrEditForm || workLocations !== undefined) return;
    setLoading(true);
    CommonService.getWorkLocations()
      .then((locations) => {
        setWorkLocations(locations);
      })
      .finally(() => setLoading(false));
  }, [showCreateOrEditForm, workLocations]);

  const columns = useMemo(
    () => [
      {
        header: i18n.t('row_number'),
        enableHiding: false,
        Cell: ({ row }: { row: { index: number } }) => {
          return (
            <Typography sx={{ textAlign: 'right' }} key={'row_' + row.index}>
              {row.index + 1}
            </Typography>
          );
        },
        size: 40
      },
      {
        header: i18n.t('coding_name'),
        accessorKey: 'name',
        size: 150
      }
    ],
    []
  );

  return (
    <>
      <Helmet>
        <title>{i18n.t('coding').toString()}</title>
      </Helmet>
      {loading && <Loader />}
      {!loading && data && !showCreateOrEditForm && (
        <Grid>
          <Button
            buttonType={ButtonType.ADD}
            showIcon={false}
            text={i18n.t('new_coding').toString()}
            sx={{ marginBottom: '20px' }}
            onClick={() => setShowCreateOrEditForm(true)}
          />
          <MyCustomTable
            rowActions={({
              row
            }: {
              row: { original: { id: string | number } };
            }) => (
              <TableRowAction
                onEdit={() => {
                  const coding = data?.find((e) => e.id === row.original.id);
                  if (coding) {
                    setSelectedCodingForEdit(coding.id);
                    setShowCreateOrEditForm(true);
                  }
                }}
                onDelete={() => setSelectedCodingForDelete(row.original.id)}
              />
            )}
            enableRowActions={true}
            columns={columns}
            data={data}
          />
        </Grid>
      )}
      {showCreateOrEditForm && workLocations && (
        <CreateOrEditCoding
          existForm={
            selectedCodingForEdit === undefined
              ? undefined
              : data?.find((e) => e.id === selectedCodingForEdit)
          }
          treeView={workLocations}
          onSuccess={() => {
            setShowCreateOrEditForm(false);
            setSelectedCodingForEdit(undefined);
          }}
          onClose={() => {
            setShowCreateOrEditForm(false);
            setSelectedCodingForEdit(undefined);
          }}
        />
      )}
      {selectedCodingForDelete && (
        <ConfirmationDialog
          id="remove_modal"
          open={selectedCodingForDelete !== undefined}
          onClose={() => setSelectedCodingForDelete(undefined)}
          closeOnEsc={true}
          dialogTitle={i18n.t('confirm_remove')}
          dialogOkBtnAction={() => {
            setLoading(true);
            removeCoding({ id: selectedCodingForDelete })
              .then((res) => {
                if ('statusCode' in res && res.statusCode === 200) {
                  setData(data?.filter((e) => e.id !== selectedCodingForDelete) ?? []);
                  toast.success(i18n.t('coding_removed').toString());
                }
              })
              .finally(() => setLoading(false));
          }}
        />
      )}
    </>
  );
}

export default Coding;
