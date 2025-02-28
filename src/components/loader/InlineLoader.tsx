import { Box, CircularProgress } from '@mui/material';

function InlineLoader({ size = 32 }: { size?: number }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <CircularProgress size={size} disableShrink thickness={3} />
    </Box>
  );
}

export default InlineLoader;
