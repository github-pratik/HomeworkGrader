import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  TextField,
  TableSortLabel,
} from '@mui/material';

// Mock data for demonstration
const assignments = [
  { id: 'JavaScript Basics', name: 'JavaScript Basics' },
  { id: 'Angular Fundamentals', name: 'Angular Fundamentals' },
  { id: 'React Components', name: 'React Components' },
];

const mockSubmissions = [
  {
    id: 1,
    studentName: 'John Doe',
    studentId: 'S12345',
    assignment: 'JavaScript Basics',
    assignmentTitle: 'JavaScript Basics',
    submissionTime: '2023-11-10T14:30:00',
    status: 'submitted',
    grade: null,
    fileName: 'hw1_johndoe.pdf',
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    studentId: 'S12346',
    assignment: 'JavaScript Basics',
    assignmentTitle: 'JavaScript Basics',
    submissionTime: '2023-11-11T09:15:00',
    status: 'graded',
    grade: 85,
    fileName: 'hw1_janesmith.pdf',
  },
  {
    id: 3,
    studentName: 'Bob Johnson',
    studentId: 'S12347',
    assignment: 'JavaScript Basics',
    assignmentTitle: 'JavaScript Basics',
    submissionTime: '2023-11-15T10:00:00',
    status: 'late',
    grade: null,
    fileName: 'hw1_bobjohnson.pdf',
  },
];

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'graded', label: 'Graded' },
  { value: 'late', label: 'Late' },
];

const statusChip = (status) => {
  switch (status) {
    case 'submitted':
      return <Chip label="Submitted" color="warning" size="small" sx={{ fontWeight: 'bold' }} />;
    case 'graded':
      return <Chip label="Graded" color="success" size="small" sx={{ fontWeight: 'bold' }} />;
    case 'late':
      return <Chip label="Late" color="error" size="small" sx={{ fontWeight: 'bold' }} />;
    default:
      return <Chip label={status} size="small" />;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const ReviewSubmissionsPage = ({ submissions = mockSubmissions }) => {
  const [assignmentFilter, setAssignmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewSubmission, setViewSubmission] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'submissionTime',
    direction: 'desc'
  });
  const navigate = useNavigate();

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc';
    setSortConfig({ key, direction });
  };

  const sortedSubmissions = [...submissions].sort((a, b) => {
    if (sortConfig.key === 'submissionTime') {
      const dateA = new Date(a[sortConfig.key]);
      const dateB = new Date(b[sortConfig.key]);
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    if (sortConfig.direction === 'asc') {
      return String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key]));
    }
    return String(b[sortConfig.key]).localeCompare(String(a[sortConfig.key]));
  });

  const filteredSubmissions = sortedSubmissions.filter((sub) => {
    const assignmentMatch = assignmentFilter === 'all' || sub.assignment === assignmentFilter;
    const statusMatch = statusFilter === 'all' || sub.status === statusFilter;
    const searchMatch = searchQuery === '' || 
      sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    return assignmentMatch && statusMatch && searchMatch;
  });

  const handleGradeClick = (submission) => {
    // Navigate to grade submissions page with the selected submission
    navigate('/grade-submissions', { 
      state: { 
        selectedSubmission: submission,
        showAiDialog: true 
      } 
    });
  };

  const handleCloseModal = () => {
    setViewSubmission(null);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="assignment-filter-label">Assignment</InputLabel>
              <Select
                labelId="assignment-filter-label"
                value={assignmentFilter}
                label="Assignment"
                onChange={(e) => setAssignmentFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                {assignments.map((a) => (
                  <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map((s) => (
                  <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search"
              placeholder="Search by student name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>Student</TableCell>
              <TableCell sx={{ color: 'white' }}>Assignment</TableCell>
              <TableCell sx={{ color: 'white' }}>
                <TableSortLabel
                  active={sortConfig.key === 'submissionTime'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('submissionTime')}
                  sx={{
                    color: 'white',
                    '&.MuiTableSortLabel-root': {
                      color: 'white',
                    },
                    '&.MuiTableSortLabel-root:hover': {
                      color: 'white',
                    },
                    '&.Mui-active': {
                      color: 'white',
                    },
                    '& .MuiTableSortLabel-icon': {
                      color: 'white !important',
                    },
                  }}
                >
                  Submission Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Grade</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>{sub.studentName} ({sub.studentId})</TableCell>
                  <TableCell>{sub.assignmentTitle}</TableCell>
                  <TableCell>{formatDate(sub.submissionTime)}</TableCell>
                  <TableCell>{statusChip(sub.status)}</TableCell>
                  <TableCell>{sub.grade !== null ? sub.grade : 'Not graded'}</TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" onClick={() => setViewSubmission(sub)}>
                      View
                    </Button>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      sx={{ ml: 1 }}
                      onClick={() => handleGradeClick(sub)}
                    >
                      Grade
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1">No submissions available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Submission Details Dialog */}
      <Dialog 
        open={!!viewSubmission} 
        onClose={handleCloseModal}
        maxWidth="md" 
        fullWidth
        TransitionProps={{
          onExited: () => setViewSubmission(null)
        }}
      >
        <DialogTitle>Submission Details</DialogTitle>
        <DialogContent>
          {viewSubmission && (
            <Box>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Typography><b>Student:</b> {viewSubmission.studentName}</Typography>
                  <Typography><b>Student ID:</b> {viewSubmission.studentId}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><b>Assignment:</b> {viewSubmission.assignmentTitle}</Typography>
                  <Typography><b>Grade:</b> {viewSubmission.grade !== null ? viewSubmission.grade : 'Not graded'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><b>Submitted:</b> {formatDate(viewSubmission.submissionTime)}</Typography>
                  <Typography><b>Status:</b> {viewSubmission.status.charAt(0).toUpperCase() + viewSubmission.status.slice(1)}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography sx={{ mb: 1 }}><b>Submitted File</b></Typography>
              <a href="#" download>{viewSubmission.fileName}</a>
              <Paper sx={{ mt: 2, p: 2, bgcolor: 'grey.100' }}>
                File preview would be displayed here in a real application.
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button disabled>Download</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleGradeClick(viewSubmission)}
          >
            Grade Submission
          </Button>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReviewSubmissionsPage; 