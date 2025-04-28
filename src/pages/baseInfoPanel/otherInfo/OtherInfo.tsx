import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { fetchOtherInfoList, OtherInfoItem } from 'src/services/baseInfoPanel/otherInfoService';
import { MyCustomTable } from 'src/components';

interface TableRow extends OtherInfoItem {
  index: number;
}

export default function OtherInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [otherInfo, setOtherInfo] = useState<OtherInfoItem[]>([]);
  const [selectedInfo, setSelectedInfo] = useState<OtherInfoItem | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchOtherInfoList();
      if (response?.statusCode === 200 && response.content) {
        const mappedData = response.content.map(item => ({
          id: item.id,
          name: item.name || '',
          code: item.code || '',
          status: item.status || false
        }));
        setOtherInfo(mappedData);
      }
    } catch (error) {
      console.error('Error fetching other info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'ردیف',
        accessor: 'index',
        width: 60
      },
      {
        Header: 'نام',
        accessor: 'name'
      },
      {
        Header: 'کد',
        accessor: 'code'
      },
      {
        Header: 'وضعیت',
        accessor: 'status',
        Cell: ({ value }: { value: boolean }) => (value ? 'فعال' : 'غیرفعال')
      }
    ],
    []
  );

  const handleEdit = (row: TableRow) => {
    setSelectedInfo(row);
    setShowCreateForm(true);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">اطلاعات پایه</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => setShowCreateForm(true)}
            >
              افزودن
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <MyCustomTable
            columns={columns}
            data={otherInfo.map((item, index) => ({ ...item, index: index + 1 }))}
            isLoading={isLoading}
            enableRowActions
            rowActions={[
              {
                label: 'ویرایش',
                onClick: handleEdit
              }
            ]}
          />
        </Grid>
      </Grid>

      {showCreateForm && (
        <Dialog open={showCreateForm} onClose={() => setShowCreateForm(false)}>
          <DialogTitle>
            {selectedInfo ? 'ویرایش اطلاعات' : 'افزودن اطلاعات جدید'}
          </DialogTitle>
          <DialogContent>
            {/* Add your form content here */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCreateForm(false)}>انصراف</Button>
            <Button variant="contained" color="primary">
              ذخیره
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
