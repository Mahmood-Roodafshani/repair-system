import { Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardCard from './DashboardCard';
import {Helmet} from 'react-helmet-async';

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(3)};
    width: 100%;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.palette.background.default};
`;

const CardsContainer = styled(Grid)`
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 20px 20px 0 20px;
    width: calc(100% - 40px);
`;

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(4, 0),
  borderColor: theme.palette.mode === 'dark' 
    ? theme.colors.gradients.orange1 
    : theme.colors.gradients.blue1,
  opacity: 0.5,
  '&::before, &::after': {
    borderColor: 'inherit',
  }
}));

function Dashboard() {
    return (
        <>
            <Helmet>
                <title>سامانه برخط</title>
            </Helmet>
            <Container>
                <CardsContainer container spacing={3}>
                    <Grid item xs={12} lg={4}>
                        <DashboardCard
                            variant="top"
                            title="کارتابل عمومی"
                            notifications={3}
                            navigateTo=""
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <DashboardCard
                            variant="top"
                            title="هشدار"
                            notifications={1}
                            navigateTo=""
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <DashboardCard
                            variant="top"
                            title="اطلاع رسانی"
                            navigateTo=""
                        />
                    </Grid>
                </CardsContainer>
                <StyledDivider />
                <CardsContainer container spacing={3}>
                    <Grid item xs={12} lg={4}>
                        <DashboardCard
                            variant="bottom"
                            title="سامانه تعمیرات"
                            notifications={2}
                            navigateTo="/repair-panel"
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <DashboardCard
                            variant="bottom"
                            title="سامانه مدیریت کاربران"
                            navigateTo="/usermanagement"
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <DashboardCard
                            variant="bottom"
                            title="سامانه مشاغل سازمانی"
                            navigateTo="/jobs-panel"
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <DashboardCard
                            variant="bottom"
                            title="سامانه ردیابی فعالیت کاربران"
                            navigateTo="/tracking-panel"
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <DashboardCard
                            variant="bottom"
                            title="سامانه کدینگ"
                            navigateTo="/coding-panel"
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <DashboardCard
                            variant="bottom"
                            title="سامانه اطلاعات پایه"
                            navigateTo="/base-info-panel"
                        />
                    </Grid>
                </CardsContainer>
            </Container>
        </>
    );
}

export default Dashboard;
