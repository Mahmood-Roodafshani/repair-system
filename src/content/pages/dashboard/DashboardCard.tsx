import { Grid, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router';

const StyledCard = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  cursor: 'pointer',
  fontWeight: 'bolder',
  fontSize: '1.2rem',
  height: '100px',
  padding: '0 16px',
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.colors.shadows.primary,
  }
}));

const TopCard = styled(StyledCard)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' 
    ? theme.colors.gradients.black2 
    : theme.colors.gradients.green1,
  border: `3px solid ${theme.palette.mode === 'dark' 
    ? theme.colors.gradients.orange1 
    : theme.colors.gradients.blue1}`,
  color: theme.palette.mode === 'dark' 
    ? theme.colors.gradients.orange1 
    : theme.colors.gradients.blue1,
}));

const BottomCard = styled(StyledCard)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark'
    ? theme.colors.gradients.black1
    : theme.colors.gradients.blue2,
  color: theme.colors.alpha.white[100],
}));

const NotificationCounter = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '5px',
  left: '5px',
  fontSize: '0.9rem',
  backgroundColor: theme.palette.mode === 'dark'
    ? theme.colors.gradients.orange1
    : theme.colors.warning.main,
  padding: '2px 8px',
  borderRadius: '8px',
  color: theme.palette.error.main,
  fontWeight: 'bold',
  minWidth: '20px',
  textAlign: 'center',
}));

interface DashboardCardProps {
  title: string;
  variant?: 'top' | 'bottom';
  notifications?: number;
  navigateTo: string;
}

function DashboardCard({
  title,
  variant = 'top',
  notifications,
  navigateTo
}: DashboardCardProps) {
  const navigate = useNavigate();
  const CardComponent = variant === 'top' ? TopCard : BottomCard;

  return (
    <CardComponent onClick={() => navigate(navigateTo)}>
      {title}
      {notifications !== undefined && notifications > 0 && (
        <NotificationCounter>{notifications}</NotificationCounter>
      )}
    </CardComponent>
  );
}

export default DashboardCard;
