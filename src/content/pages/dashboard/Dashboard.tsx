import { Grid } from '@mui/material';
import './style.scss';
import DashboardCard from './DashboardCard';
import { Helmet } from 'react-helmet-async';

function Dashboard() {
  return (
    <>
      <Helmet>
        <title>سامانه برخط</title>
      </Helmet>
      <Grid display={'flex'} flexDirection={'column'} gap={'20px'}>
        <Grid container spacing={1} className="top-cards">
          <DashboardCard
            notifsCount={3}
            xs={12}
            lg={4}
            title="کارتابل عمومی"
            navigateTo=""
          />
          <DashboardCard
            notifsCount={1}
            xs={12}
            lg={4}
            title="هشدار"
            navigateTo=""
          />
          <DashboardCard xs={12} lg={4} title="اطلاع رسانی" navigateTo="" />
        </Grid>
        <Grid className="bottom-cards">
          <Grid container spacing={1}>
            <DashboardCard
              xs={12}
              lg={4}
              title="سامانه تعمیرات"
              navigateTo="/repair-panel"
              notifsCount={2}
            />
            <DashboardCard
              xs={12}
              lg={4}
              title="سامانه مدیریت کاربران"
              navigateTo="/usermanagement"
            />
            <DashboardCard
              xs={12}
              lg={4}
              title="سامانه مشاغل سازمانی"
              navigateTo="/jobs-panel"
            />
            <DashboardCard
              xs={12}
              lg={4}
              title="سامانه ردیابی فعالیت کاربران"
              navigateTo="/tracking-panel"
            />
            <DashboardCard
              xs={12}
              lg={4}
              title="سامانه کدینگ"
              navigateTo="/coding-panel"
            />
            <DashboardCard
              xs={12}
              lg={4}
              title="سامانه اطلاعات پایه"
              navigateTo="/base-info-panel"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
