import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import HomeworkDefinition from '../components/HomeworkDefinition';

const DefineHomeworkPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Define Homework Assignment
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Create a new homework assignment with custom rubrics and requirements
        </Typography>
      </Box>
      <HomeworkDefinition />
    </Container>
  );
};

export default DefineHomeworkPage; 