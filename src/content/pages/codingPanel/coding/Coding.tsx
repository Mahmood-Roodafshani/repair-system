import { Delete, Edit } from '@mui/icons-material';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Loader, MyCustomTable } from 'src/components';
import { i18n } from 'src/i18n';
import { ConfirmationDialog } from 'src/mahmood-components';
import { fetchCodingList, fetchWorkLocations, removeCoding } from 'src/service';
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
    Promise.all([fetchWorkLocations()])
      .then((res) => {
        if (res[0].statusCode === 200) setWorkLocations(res[0].content);
      })
      .finally(() => setLoading(false));
  }, [showCreateOrEditForm, workLocations]);

  const columns = useMemo(
    () => [
      {
        header: i18n.t('row_number'),
        enableHiding: false,
        Cell: ({ row }) => {
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
            variant="contained"
            color="primary"
            sx={{ marginBottom: '20px' }}
            onClick={() => setShowCreateOrEditForm(true)}
          >
            {i18n.t('new_coding').toString()}
          </Button>
          <MyCustomTable
            rowActions={({
              row
            }: {
              row: { original: { id: string | number } };
            }) => (
              <Grid display={'flex'} flex={'row'} gap={'10px'}>
                <IconButton
                  color="secondary"
                  onClick={() => {
                    setSelectedCodingForEdit(
                      data.find((e) => e.id === row.original.id).id
                    );
                    setShowCreateOrEditForm(true);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => setSelectedCodingForDelete(row.original.id)}
                >
                  <Delete />
                </IconButton>
              </Grid>
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
              : data.find((e) => e.id === selectedCodingForEdit)
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
            removeCoding({ codingId: selectedCodingForDelete })
              .then((res) => {
                if (res.statusCode === 200) {
                  setData(data.filter((e) => e.id !== selectedCodingForDelete));
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
