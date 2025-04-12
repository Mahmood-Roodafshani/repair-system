import { Close, Search } from '@mui/icons-material';
import { Grid, IconButton, TextField } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import {
  CustomRichTreeView,
  InlineLoader,
  MyCustomTable,
  OpGrid
} from 'src/components';
import { i18n } from 'src/localization';
import { createNewAccessControl, findStaffByCode } from 'src/services';
import { RichViewType } from 'src/types';
import { findItemById, mapAllIdsInNestedArray } from 'src/utils/helper';

function NewAccess({
  jobs,
  onClose,
  onSubmit
}: {
  jobs: RichViewType[];
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [staffCode, setStaffCode] = useState<string>();
  const [defaultValues, setDefaultValues] = useState<string[]>();
  const [loading, setLoading] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<{
    id: string;
    name: string;
    granted_jobs: string[];
  }>();
  const [grants, setGrants] = useState<
    { id: number | string; title: string }[]
  >([]);
  const searchStaff = useCallback(() => {
    setLoading(true);
    Promise.all([findStaffByCode({ staffCode: staffCode })])
      .then((res) => {
        if (res[0].statusCode === 200) {
          setSelectedStaff(res[0].content);
          setDefaultValues(res[0].content.granted_jobs?.map((e) => 'job_' + e));
          setGrants(
            res[0].content.granted_jobs.map((e) => {
              const job = findItemById(jobs, e);
              return {
                id: job.id,
                title: job.label
              };
            })
          );
        }
      })
      .finally(() => setLoading(false));
  }, [staffCode]);
  const columns = useMemo(
    () => [
      {
        header: i18n.t('job_title'),
        accessorKey: 'title',
        size: 300
      }
    ],
    []
  );

  return (
    <Grid display={'flex'} flexDirection={'column'} gap={'20px'} mb={'50px'}>
      <Grid display={'flex'} flexDirection={'row'} gap={'10px'}>
        <TextField
          label={i18n.t('staff_code').toString()}
          onChange={(e) => setStaffCode(e.target.value)}
        />
        <IconButton
          color="primary"
          onClick={() => {
            if (!staffCode?.length) {
              toast(i18n.t('staff_code_is_req').toString(), { type: 'error' });
              return;
            }
            setSelectedStaff(undefined);
            setGrants([]);
            setDefaultValues(undefined);
            searchStaff();
          }}
        >
          <Search />
        </IconButton>
        <TextField
          value={selectedStaff?.name}
          label={
            selectedStaff === undefined ? i18n.t('staff_name').toString() : ''
          }
          disabled={true}
        />
        {loading && selectedStaff === undefined && <InlineLoader />}
      </Grid>
      {selectedStaff && (
        <>
          <CustomRichTreeView
            label={i18n.t('choose_job').toString()}
            items={mapAllIdsInNestedArray('job_', jobs)}
            multiSelect={true}
            justSelectLeaf={true}
            checkboxSelection={true}
            defaultValue={defaultValues}
            onSelectedItemsChange={(_, itemIds) =>
              setGrants(
                itemIds.map((e) => {
                  const job = findItemById(jobs, e.replace('job_', ''));
                  return {
                    id: job.id,
                    title: job.label
                  };
                })
              )
            }
          />

          <MyCustomTable
            rowActions={({
              row
            }: {
              row: { original: { id: string | number } };
            }) => (
              <IconButton
                color="error"
                onClick={() => {
                  setDefaultValues(
                    grants
                      .filter((grant) => grant.id !== row.original.id)
                      .map((grant) => 'job_' + grant.id)
                  );
                  setGrants(
                    grants.filter((grant) => grant.id !== row.original.id)
                  );
                }}
              >
                <Close />
              </IconButton>
            )}
            data={grants}
            enableRowNumbers={true}
            enableRowActions={true}
            columns={columns}
          />
          {loading && <InlineLoader />}
          {!loading && (
            <OpGrid
              onCreateOrEdit={
                selectedStaff
                  ? async () => {
                      setLoading(true);
                      const res = await createNewAccessControl({
                        staffCode: staffCode,
                        grants: grants.map((e) =>
                          e.id.toString().replace('job_', '')
                        )
                      });
                      setLoading(false);
                      if (res.statusCode === 200)
                        toast(i18n.t('new_access_created').toString(), {
                          type: 'success'
                        });
                      onSubmit();
                    }
                  : undefined
              }
              onClose={onClose}
            />
          )}
        </>
      )}
      {selectedStaff === undefined && <OpGrid onClose={onClose} />}
    </Grid>
  );
}

export default NewAccess;
