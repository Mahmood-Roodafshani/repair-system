import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import {
  MRT_ColumnDef
} from 'material-react-table';
import {
  InlineLoader,
  Loader,
  MyCustomTable,
  OpGrid
} from '../../../components';
import {
  FamilyRelation
} from '../../../constant/enums';
import { RichViewType } from '../../../types/richViewType';
import { StaffInfoResponseType } from '../../../types/responses/baseInfoPanel/staffInfo/staffInfoResponseType';
import { i18n } from '../../../localization';
import { ConfirmationDialog } from '../../../components/form/ConfirmationDialog';
import { TextFieldFormik } from '../../../components/form/TextFieldFormik';
import CommonService from '../../../services/CommonService';
import {
  fetchFamilyInfoList,
  removeFamilyInfo
} from '../../../services/baseInfoPanel';
import CreateOrEditForm from '../common/CreateOrEditForm';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { Add, Edit, Delete } from '@mui/icons-material';
import { ApiResponse } from 'src/types/responses/apiResponse';

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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [familyInfo, setFamilyInfo] = useState<ExtendedStaffInfoResponseType[]>([]);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<ExtendedStaffInfoResponseType | null>(null);
  const [positionDegrees, setPositionDegrees] = useState<RichViewType[]>([]);
  const [selectedMemberIdForDelete, setSelectedMemberIdForDelete] = useState<string | number>();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [richViewData, setRichViewData] = useState<RichViewType[]>([]);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [cities, setCities] = useState<RichViewType[]>([]);
  const [educationalFields, setEducationalFields] = useState<RichViewType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if ((selectedFamilyMember || showCreateForm) && !cities) {
      setLoading(true);
      Promise.all([CommonService.getCities()])
        .then((res) => {
          setCities(res[0]);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedFamilyMember, showCreateForm]);

  useEffect(() => {
    if (selectedFamilyMember?.familyInfo) {
      const data = selectedFamilyMember.familyInfo.map(
        (info: FamilyInfoItem): RichViewType => ({
          id: info.id.toString(),
          label: info.label || ''
        })
      );
      setRichViewData(data);
    } else {
      setRichViewData([]);
    }
  }, [selectedFamilyMember]);

  useEffect(() => {
    if (familyInfo) {
      const mappedData = familyInfo.map((item, index) => ({
        ...item,
        index,
        original: item
      }));
      setTableData(mappedData);
    }
  }, [familyInfo]);

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

  const handleEdit = (row: TableRow) => {
    setSelectedFamilyMember(row.original);
    setShowEditForm(true);
  };

  const handleDelete = (row: TableRow) => {
    setSelectedMemberIdForDelete(row.original.id);
    setShowDeleteDialog(true);
  };

  const dialogOkBtnAction = async () => {
    if (selectedMemberIdForDelete) {
      setLoading(true);
      try {
        await removeFamilyInfo({ memberId: selectedMemberIdForDelete });
        setSelectedMemberIdForDelete(undefined);
        setShowDeleteDialog(false);
        await fetchData();
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFamilyRelationChange = (value: string) => {
    if (value && Object.values(FamilyRelation).includes(value as FamilyRelation)) {
      return value as FamilyRelation;
    }
    return undefined;
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
                onClick: () => handleEdit(row)
              }
            ]}
          />
        </>
      )}

      {selectedFamilyMember && (
        <CreateOrEditForm
          initialValues={{
            name: selectedFamilyMember.name || '',
            id: selectedFamilyMember.id,
            familyRelation: selectedFamilyMember.familyRelation || '',
            nationalCode: selectedFamilyMember.nationalCode || '',
            birthDate: selectedFamilyMember.birthDate || '',
            education: selectedFamilyMember.education || '',
            job: selectedFamilyMember.job || ''
          }}
          positionDegrees={positionDegrees}
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
