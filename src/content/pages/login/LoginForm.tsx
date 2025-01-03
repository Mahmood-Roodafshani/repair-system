import { Box, Container, Card, TextField, Grid, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import { signIn } from 'src/service';
import { useState } from 'react';
import { SignInRequest } from 'src/types';
import { useNavigate } from 'react-router';

const LoginWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function LoginForm() {
  const [data, setData] = useState<SignInRequest>({
    phone: undefined,
    password: undefined
  });
  const navigate = useNavigate();
  return (
    <LoginWrapper>
      <Helmet>
        <title>ورود/ثبت نام</title>
      </Helmet>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          <Logo />
        </Box>
        <Card sx={{ p: 10, mb: 10, borderRadius: 12 }}>
          <Grid
            display={'flex'}
            flexDirection={'column'}
            gap={'20px'}
            width={'300px'}
            margin={'0 auto'}
            sx={{ direction: 'rtl' }}
          >
            <TextField
              required
              dir="rtl"
              id="outlined-required"
              label="نام کاربری"
              placeholder="09xxxxxxxxx"
              value={data.phone}
              onChange={(e) =>
                setData((prevValues) => ({
                  ...prevValues,
                  phone: e.target.value
                }))
              }
            />
            <TextField
              required
              type="password"
              id="outlined-required"
              label="رمزعبور"
              placeholder="123456"
              value={data.password}
              onChange={(e) =>
                setData((prevValues) => ({
                  ...prevValues,
                  password: e.target.value
                }))
              }
            />
            <Button
              onClick={async () => {
                const res = await signIn({ data: data });
                if (res.statusCode === 200) navigate('/dashboards/crypto');
              }}
              variant="contained"
            >
              ورود
            </Button>
          </Grid>
        </Card>
      </Container>
    </LoginWrapper>
  );
}

export default LoginForm;
