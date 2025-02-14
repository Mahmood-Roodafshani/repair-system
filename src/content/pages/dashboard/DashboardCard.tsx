import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import './style.scss';
import { GridSize } from '@mui/material/Grid';

function DashboardCard({
  title,
  navigateTo,
  xs,
  lg,
  notifsCount
}: {
  title: string;
  navigateTo: string;
  xs: GridSize;
  lg: GridSize;
  notifsCount?: number;
}) {
  const navigate = useNavigate();
  return (
    <Grid item xs={xs} lg={lg}>
      <Grid onClick={() => navigate(navigateTo)} className="dashboard-card">
        {title}
        {notifsCount && (
          <Typography className="notif-counter">{notifsCount}</Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default DashboardCard;
