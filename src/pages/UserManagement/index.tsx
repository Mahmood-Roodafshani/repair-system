import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const UserManagement: React.FC = () => {
  return (
    <Container maxWidth={false}>
      <Box
        sx={{
          py: 3
        }}
      >
        <Typography variant="h2">مدیریت کاربران</Typography>
        <Box mt={3}>
          {/* Add your user management content here */}
          <Typography>محتوای مدیریت کاربران در اینجا قرار می‌گیرد</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default UserManagement; 