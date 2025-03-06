import { Grid, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router';

const StyledCard = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  height: '90px',
  padding: '0 20px',
  transition: theme.transitions.create(['transform', 'box-shadow']),
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
  top: '8px',
  left: '8px',
  fontSize: '0.85rem',
  backgroundColor: theme.palette.mode === 'dark'
    ? theme.colors.gradients.orange1
    : theme.colors.warning.main,
  padding: '1px 8px',
  borderRadius: '6px',
  color: theme.palette.mode === 'dark'
    ? theme.palette.error.main
    : theme.palette.error.contrastText,
  fontWeight: 'bold',
  minWidth: '18px',
  textAlign: 'center',
  boxShadow: theme.colors.shadows.warning,
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
