import { Box, CircularProgress } from '@mui/material';

function Loader({ size = 64 }: { size?: number }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={size} disableShrink thickness={3} />
    </Box>
  );
}

export default Loader;
