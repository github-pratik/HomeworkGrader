import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
} from '@mui/material';

const HomePage = () => {
  // Mock data - In a real app, this would come from your backend
  const stats = {
    totalAssignments: 3,
    totalSubmissions: 33,
    pendingGrading: 13,
  };

  const recentAssignments = [
    {
      id: 1,
      title: 'JavaScript Basics',
      dueDate: '2023-11-15',
      submissions: 18,
      graded: 12,
    },
    {
      id: 2,
      title: 'React Components',
      dueDate: '2023-11-22',
      submissions: 15,
      graded: 8,
    },
    {
      id: 3,
      title: 'API Integration',
      dueDate: '2023-12-01',
      submissions: 0,
      graded: 0,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" color="primary" gutterBottom sx={{ mb: 4 }}>
        Instructor Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'background.paper',
            }}
            elevation={2}
          >
            <Typography color="text.secondary" variant="h6" gutterBottom>
              Total Assignments
            </Typography>
            <Typography color="primary" variant="h3" component="div">
              {stats.totalAssignments}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'background.paper',
            }}
            elevation={2}
          >
            <Typography color="text.secondary" variant="h6" gutterBottom>
              Total Submissions
            </Typography>
            <Typography color="primary" variant="h3" component="div">
              {stats.totalSubmissions}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: 'background.paper',
            }}
            elevation={2}
          >
            <Typography color="text.secondary" variant="h6" gutterBottom>
              Pending Grading
            </Typography>
            <Typography color="primary" variant="h3" component="div">
              {stats.pendingGrading}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Assignments Table */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" color="text.primary" gutterBottom>
          Recent Assignments
        </Typography>
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white' }}>Title</TableCell>
                <TableCell sx={{ color: 'white' }}>Due Date</TableCell>
                <TableCell sx={{ color: 'white' }}>Submissions</TableCell>
                <TableCell sx={{ color: 'white' }}>Graded</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
                  <TableCell>{assignment.submissions}</TableCell>
                  <TableCell>{assignment.graded}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="outlined">
                        View
                      </Button>
                      <Button size="small" variant="outlined">
                        Edit
                      </Button>
                      <Button size="small" variant="outlined">
                        Grade
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default HomePage; 