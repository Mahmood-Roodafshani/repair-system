import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import {
  MRT_Cell,
  MRT_Column,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance
} from 'material-react-table';
import {
  InlineLoader,
  Loader,
  MyCustomTable,
  OpGrid,
  TableRowAction
} from '../../../components';
import {
  Degree,
  FamilyRelation,
  Gender,
  MaritalStatus,
  Religion
} from '../../../constant/enums';
import { RichViewType } from '../../../types/richViewType';
import { StaffInfoRequestType, StaffInfoResponseType } from '../../../types/requests/baseInfoPanel/staffInfo';
import { i18n } from '../../../localization';
import { ConfirmationDialog } from '../../../components/form/ConfirmationDialog';
import { TextFieldFormik } from '../../../components/form/TextFieldFormik';
import CommonService from '../../../services/CommonService';
import {
  fetchFamilyInfoList,
  removeFamilyInfo,
  updateFamilyInfo
} from '../../../services/baseInfoPanel';
import CreateOrEditForm from '../common/CreateOrEditForm';
import { filterValidationSchema } from '../common/validationSchema';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { Add } from '@mui/icons-material';

interface TableRow {
  index: number;
  original: ExtendedStaffInfoResponseType;
}

interface FamilyInfoItem {
  id: string;
  label: string;
}

interface ExtendedStaffInfoResponseType extends Omit<StaffInfoResponseType, 'familyRelation'> {
  familyInfo?: FamilyInfoItem[];
  familyRelation?: FamilyRelation;
  index: number;
}

function FamilyInfo() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [familyInfo, setFamilyInfo] = useState<ExtendedStaffInfoResponseType[]>([]);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<ExtendedStaffInfoResponseType | undefined>();
  const [positionDegrees, setPositionDegrees] = useState<RichViewType[]>([]);
  const [selectedMemberIdForDelete, setSelectedMemberIdForDelete] = useState<string | number>();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [cities, setCities] = useState<RichViewType[]>([]);
  const [educationalFields, setEducationalFields] = useState<RichViewType[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [richViewData, setRichViewData] = useState<RichViewType[]>([]);
  const [tableData, setTableData] = useState<TableRow[]>([]);

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
      const response = await fetchFamilyInfoList();
      if (response?.statusCode === 200) {
        const mappedData = response.content?.map((item, index) => ({
          ...item,
          index,
          familyRelation: item.familyRelation as FamilyRelation,
          original: {
            ...item,
            index,
            familyRelation: item.familyRelation as FamilyRelation
          }
        })) || [];
        setFamilyInfo(mappedData);
      }
    } catch (error) {
      console.error('Error fetching family info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: ExtendedStaffInfoResponseType) => {
    setSelectedFamilyMember(member);
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

  const handleSubmit = async (values: StaffInfoRequestType) => {
    if (!selectedFamilyMember?.id) return;

    setLoading(true);
    try {
      await updateFamilyInfo({
        memberId: selectedFamilyMember.id,
        memberInfo: values
      });
      await fetchData();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEnumValue = <T extends Record<string, string | number>>(
    enumObj: T,
    key: string | number | boolean | undefined
  ): T[keyof T] | undefined => {
    if (key === undefined || key === false) return undefined;
    if (typeof key === 'boolean') return undefined;
    return enumObj[key as keyof T];
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
            setSelectedFamilyMember(undefined);
            fetchData();
          }}
          onClose={() => setSelectedFamilyMember(undefined)}
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
