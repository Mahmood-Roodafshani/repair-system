import { Box, Container, TextField, Grid, Button, Typography, Paper, InputAdornment, IconButton } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import { toast } from 'react-toastify';
import { useKeycloak } from '@react-keycloak/web';

const LoginWrapper = styled(Box)(
  ({ theme }) => `
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: #009db1;
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
    background: rgba(255, 255, 255, 0.9);
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
      background: #ffffff;
      color: #333333;
      transition: all 0.3s ease;
      &:hover {
        .MuiOutlinedInput-notchedOutline {
          border-color: rgba(0, 0, 0, 0.2);
        }
      }
      &.Mui-focused {
        .MuiOutlinedInput-notchedOutline {
          border-color: #009db1;
          border-width: 2px;
        }
      }
      .MuiInputBase-input {
        color: #333333;
      }
      .MuiInputAdornment-root {
        .MuiSvgIcon-root {
          color: #009db1;
        }
      }
    }
    .MuiInputLabel-root {
      color: rgba(0, 0, 0, 0.6);
      &.Mui-focused {
        color: #009db1;
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
    background: #009db1;
    color: #ffffff;
    box-shadow: 0 3px 5px 2px rgba(0, 157, 177, 0.2);
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-2px);
      background: #007a8a;
      box-shadow: 0 5px 8px 3px rgba(0, 157, 177, 0.3);
    }
`
);

function LoginForm() {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [initialized, keycloak.authenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await keycloak.login({
        redirectUri: window.location.origin + '/dashboard',
        loginHint: formData.username,
        prompt: 'login'
      });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('نام کاربری یا رمز عبور اشتباه است');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <LoginWrapper>
      <Helmet>
        <title>ورود به سیستم</title>
      </Helmet>
      
      <Container maxWidth={false} sx={{ px: 0 }}>
        <LoginCard>
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center"
            mb={4}
            sx={{ width: '100%' }}
          >
            <Logo />
          </Box>
          
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, fontWeight: 600, color: '#333333' }}>
            خوش آمدید
          </Typography>
          
          <Typography variant="body1" align="center" sx={{ mb: 4, color: 'rgba(0, 0, 0, 0.6)' }}>
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
                name="username"
                value={formData.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
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
                onClick={handleSubmit}
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
