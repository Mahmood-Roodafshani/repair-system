import { Box, Container, TextField, Grid, Button, Typography, Paper, InputAdornment, IconButton } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import { toast } from 'react-toastify';

const LoginWrapper = styled(Box)(
  ({ theme }) => `
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%);
    padding: 0;
    margin: 0;
    width: 100%;
`
);

const LoginCard = styled(Paper)(
  ({ theme }) => `
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
    padding: ${theme.spacing(4)};
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.95);
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: translateY(-5px);
    }
`
);

const StyledTextField = styled(TextField)(
  ({ theme }) => `
    .MuiOutlinedInput-root {
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.8);
      transition: all 0.3s ease;
      &:hover {
        background: rgba(255, 255, 255, 0.9);
      }
      &.Mui-focused {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 0 0 2px ${theme.palette.primary.light};
      }
    }
    .MuiInputLabel-root {
      color: ${theme.palette.text.secondary};
      &.Mui-focused {
        color: ${theme.palette.primary.main};
      }
    }
`
);

const LoginButton = styled(Button)(
  ({ theme }) => `
    height: 48px;
    border-radius: 12px;
    text-transform: none;
    font-size: 1.1rem;
    font-weight: 600;
    background: linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%);
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, .3);
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 8px 3px rgba(33, 203, 243, .4);
    }
`
);

function LoginForm() {
  const [data, setData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Mock authentication
    if (data.username === 'admin' && data.password === 'admin') {
      // In a real app, you would store the token in localStorage or context
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('ورود موفقیت‌آمیز');
      navigate('/dashboard');
    } else {
      toast.error('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <LoginWrapper>
      <Helmet>
        <title>ورود به سیستم</title>
      </Helmet>
      
      <Container maxWidth={false} sx={{ px: 0 }}>
        <LoginCard>
          <Box display="flex" justifyContent="center" mb={4}>
            <Logo />
          </Box>
          
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
            خوش آمدید
          </Typography>
          
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            لطفاً برای ورود به سیستم، اطلاعات خود را وارد کنید
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                required
                dir="rtl"
                label="نام کاربری"
                placeholder="نام کاربری خود را وارد کنید"
                value={data.username}
                onChange={(e) =>
                  setData((prevValues) => ({
                    ...prevValues,
                    username: e.target.value
                  }))
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                required
                type={showPassword ? 'text' : 'password'}
                label="رمز عبور"
                placeholder="رمز عبور خود را وارد کنید"
                value={data.password}
                onChange={(e) =>
                  setData((prevValues) => ({
                    ...prevValues,
                    password: e.target.value
                  }))
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <LoginButton
                fullWidth
                onClick={handleLogin}
              >
                ورود به سیستم
              </LoginButton>
            </Grid>
          </Grid>
        </LoginCard>
      </Container>
    </LoginWrapper>
  );
}

export default LoginForm;
