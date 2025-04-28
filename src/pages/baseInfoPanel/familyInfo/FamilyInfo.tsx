import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Loader, MyCustomTable } from '../../../components';
import { FamilyRelation } from '../../../constant/enums';
import { RichViewType } from '../../../types/richViewType';
import { StaffInfoResponseType } from '../../../types/responses/baseInfoPanel/staffInfo/staffInfoResponseType';
import { i18n } from '../../../localization';
import CommonService from '../../../services/CommonService';
import { fetchFamilyInfoList, removeFamilyInfo } from '../../../services/baseInfoPanel';
import CreateOrEditForm from '../common/CreateOrEditForm';
import { Add, Delete, Edit } from '@mui/icons-material';
import { ApiResponse } from 'src/types/responses/apiResponse';
import { AxiosResponse } from 'axios';
import { StaffInfoRequestType } from 'src/types/requests/baseInfoPanel/staffInfo/staffInfoRequestType';

interface TableRow extends ExtendedStaffInfoResponseType {
  index: number;
  original: ExtendedStaffInfoResponseType;
}

interface FamilyInfoItem {
  id: string;
  label: string;
}

interface ExtendedStaffInfoResponseType extends StaffInfoResponseType {
  familyInfo?: FamilyInfoItem[];
  familyRelation?: FamilyRelation;
  index: number;
  original?: ExtendedStaffInfoResponseType;
  birthDate?: string;
  education?: string;
  job?: string;
}

function FamilyInfo() {
  const [loading, setLoading] = useState(false);
  const [familyInfo, setFamilyInfo] = useState<ExtendedStaffInfoResponseType[]>([]);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<ExtendedStaffInfoResponseType | null>(null);
  const [selectedMemberIdForDelete, setSelectedMemberIdForDelete] = useState<string | number>();
  const [cities, setCities] = useState<RichViewType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedFamilyMember && !cities) {
      setLoading(true);
      Promise.all([CommonService.getCities()])
        .then((res) => {
          setCities(res[0]);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedFamilyMember]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchFamilyInfoList({ filter: {} });
      if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
        const mockRes = response as ApiResponse<ExtendedStaffInfoResponseType[]>;
        if (mockRes.statusCode === 200) {
          const mappedData = mockRes.content?.map((item, index) => ({
            ...item,
            index,
            original: {
              ...item,
              index,
              familyRelation: item.familyRelation
            }
          }));
          setFamilyInfo(mappedData || []);
        }
      } else {
        const apiRes = response as AxiosResponse<ExtendedStaffInfoResponseType[]>;
        if (apiRes.data) {
          const mappedData = apiRes.data.map((item, index) => ({
            ...item,
            index,
            original: {
              ...item,
              index,
              familyRelation: item.familyRelation
            }
          }));
          setFamilyInfo(mappedData);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row: ExtendedStaffInfoResponseType) => {
    setSelectedFamilyMember(row);
  };

  const handleDelete = (row: ExtendedStaffInfoResponseType) => {
    setSelectedMemberIdForDelete(row.id);
  };

  const dialogOkBtnAction = async () => {
    if (selectedMemberIdForDelete) {
      setLoading(true);
      try {
        await removeFamilyInfo({ memberId: selectedMemberIdForDelete });
        setSelectedMemberIdForDelete(undefined);
        await fetchData();
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = useMemo(() => {
    return [
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
        header: i18n.t('name'),
        accessorKey: 'name'
      },
      {
        header: i18n.t('family_relation'),
        accessorKey: 'familyRelation'
      },
      {
        header: i18n.t('national_code'),
        accessorKey: 'nationalCode'
      },
      {
        header: i18n.t('birth_date'),
        accessorKey: 'birthDate'
      },
      {
        header: i18n.t('education'),
        accessorKey: 'education'
      },
      {
        header: i18n.t('job'),
        accessorKey: 'job'
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }: { row: { original: ExtendedStaffInfoResponseType & { index: number } } }) => (
          <Box>
            <IconButton onClick={() => handleEdit(row.original)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(row.original)}>
              <Delete />
            </IconButton>
          </Box>
        )
      }
    ];
  }, []);

  return (
    <>
      <Helmet>
        <title>{i18n.t('family_info').toString()}</title>
      </Helmet>
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs>
          <Typography variant="h3">Family Info</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setSelectedFamilyMember({} as ExtendedStaffInfoResponseType)}
          >
            {i18n.t('add_new_member')}
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Loader />
      ) : (
        <>
          <MyCustomTable
            data={familyInfo}
            columns={columns}
            enableRowActions
            rowActions={({ row }: { row: { original: TableRow } }) => [
              {
                icon: <Edit />,
                tooltip: i18n.t('edit'),
                onClick: () => handleEdit(row.original)
              }
            ]}
          />
        </>
      )}

      {selectedFamilyMember && (
        <CreateOrEditForm
          initialValues={{
            firstname: selectedFamilyMember.name?.split(' ')[0] || '',
            lastname: selectedFamilyMember.name?.split(' ')[1] || '',
            id: selectedFamilyMember.id,
            familyRelation: selectedFamilyMember.familyRelation,
            nationalCode: selectedFamilyMember.nationalCode || '',
            fatherName: selectedFamilyMember.fatherName || '',
            idNumber: selectedFamilyMember.idNumber || '',
            staffCode: selectedFamilyMember.staffCode || '',
            address: selectedFamilyMember.address || '',
            mobile: selectedFamilyMember.mobile || '',
            religion: selectedFamilyMember.religion as any,
            birthLocation: selectedFamilyMember.birthLocation,
            gender: selectedFamilyMember.gender as any,
            supervisorNationalCode: selectedFamilyMember.supervisorNationalCode || '',
            degree: selectedFamilyMember.degree as any,
            serviceStatus: selectedFamilyMember.serviceStatus as any,
            martialStatus: selectedFamilyMember.maritalStatus as any,
            educationalField: selectedFamilyMember.educationalField,
            workLocation: selectedFamilyMember.workLocation,
            positionDegree: selectedFamilyMember.positionDegree
          }}
          positionDegrees={[]}
          cities={cities}
          educationalFields={[]}
          onSuccess={() => {
            setSelectedFamilyMember(null);
            fetchData();
          }}
          onClose={() => setSelectedFamilyMember(null)}
          mode="family"
        />
      )}

      <Grid item xs={12}>
        <Dialog
          open={selectedMemberIdForDelete !== undefined}
          onClose={() => setSelectedMemberIdForDelete(undefined)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{i18n.t('confirm_remove')?.toString()}</DialogTitle>
          <DialogContent>
            {i18n.t('are_you_sure_to_remove')?.toString()}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedMemberIdForDelete(undefined)}>
              {i18n.t('cancel')?.toString()}
            </Button>
            <Button onClick={dialogOkBtnAction} color="error">
              {i18n.t('delete')?.toString()}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
}

export default FamilyInfo;
