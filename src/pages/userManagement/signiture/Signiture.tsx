import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { MyCustomTable } from 'src/components';
import { SampleSignitureRequestType } from 'src/types/requests/userManagement/signiture/sampleSignitureRequestType';

function Signiture() {
    const { t } = useTranslation();
    const [signiture, setSigniture] = useState<SampleSignitureRequestType>({
        staffCode: '',
        digitalSigniture: '',
        file: undefined
    });

    const columns = [
        {
            header: t('staff_code'),
            accessorKey: 'staffCode'
        },
        {
            header: t('digital_signiture'),
            accessorKey: 'digitalSigniture'
        }
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">{t('signiture')}</Typography>
            </Grid>
            <Grid item xs={12}>
                <MyCustomTable
                    data={[signiture]}
                    columns={columns}
                />
            </Grid>
        </Grid>
    );
}

export default Signiture;
