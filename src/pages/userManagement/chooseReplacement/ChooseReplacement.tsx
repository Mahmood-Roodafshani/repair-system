import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { MyCustomTable } from 'src/components';

function ChooseReplacement() {
    const { t } = useTranslation();
    const [selectedGrants, setSelectedGrants] = useState<any[]>([]);

    const columns = [
        {
            header: t('grant_name'),
            accessorKey: 'name'
        },
        {
            header: t('description'),
            accessorKey: 'description'
        }
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">{t('choose_replacement')}</Typography>
            </Grid>
            <Grid item xs={12}>
                <MyCustomTable
                    data={selectedGrants}
                    columns={columns}
                />
            </Grid>
        </Grid>
    );
}

export default ChooseReplacement;
