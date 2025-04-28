import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { MyCustomTable } from 'src/components';
import { SystemRolesResponse } from 'src/types/responses/userManagement/roleManagement';
import { roleManagementService } from 'src/services/userManagement/roleManagementService';

interface EditSystemProps {
    systemId: number;
    systemName: string;
}

function EditSystem({ systemId, systemName }: EditSystemProps) {
    const { t } = useTranslation();
    const [roles, setRoles] = useState<SystemRolesResponse[]>([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await roleManagementService.getSystemRoles(systemId);
                setRoles(response);
            } catch (error) {
                console.error('Error fetching system roles:', error);
            }
        };

        fetchRoles();
    }, [systemId]);

    const columns = [
        {
            header: t('role_name'),
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
                <Typography variant="h4">{systemName}</Typography>
            </Grid>
            <Grid item xs={12}>
                <MyCustomTable
                    data={roles}
                    columns={columns}
                />
            </Grid>
        </Grid>
    );
}

export default EditSystem;
