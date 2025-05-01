import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Alert,
  Snackbar,
  Slide,
} from '@mui/material';
import { Code as CodeIcon } from '@mui/icons-material';

// Mock data for demonstration
const mockSubmissions = [
  {
    id: 1,
    studentName: 'John Doe',
    studentId: 'S12345',
    assignment: 'JavaScript Basics',
    submittedDate: '2023-11-10T14:30:00',
    code: 'function hello() {\n  console.log("Hello, World!");\n}',
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    studentId: 'S12346',
    assignment: 'JavaScript Basics',
    submittedDate: '2023-11-11T09:15:00',
    code: 'const add = (a, b) => a + b;\nconsole.log(add(5, 3));',
  },
  {
    id: 3,
    studentName: 'Bob Johnson',
    studentId: 'S12347',
    assignment: 'React Components',
    submittedDate: '2023-11-15T10:00:00',
    code: 'class MyComponent extends React.Component {\n  render() {\n    return <div>Hello</div>;\n  }\n}',
  },
  {
    id: 4,
    studentName: 'Alice Brown',
    studentId: 'S12348',
    assignment: 'React Components',
    submittedDate: '2023-11-16T11:30:00',
    code: 'const Button = ({ children }) => (\n  <button>{children}</button>\n);',
  },
  {
    id: 5,
    studentName: 'Charlie Wilson',
    studentId: 'S12349',
    assignment: 'API Integration',
    submittedDate: '2023-11-20T15:45:00',
    code: 'async function fetchData() {\n  const response = await fetch("https://api.example.com");\n  return response.json();\n}',
  },
];

// Rubric criteria
const rubricCriteria = [
  { name: 'Component Structure', description: 'Proper component organization and structure', maxPoints: 20 },
  { name: 'Props Usage', description: 'Correct implementation and usage of props', maxPoints: 20 },
  { name: 'Code Style', description: 'Code formatting and style consistency', maxPoints: 20 },
  { name: 'Functionality', description: 'Correct implementation of required functionality', maxPoints: 20 },
  { name: 'Documentation', description: 'Code comments and documentation', maxPoints: 20 },
];

// Mock AI grading suggestions
const mockAiSuggestions = {
  componentStructure: {
    points: 18,
    feedback: 'Good component structure, but could use more modular design.',
  },
  propsUsage: {
    points: 17,
    feedback: 'Props are used correctly, but prop validation is missing.',
  },
  codeStyle: {
    points: 19,
    feedback: 'Code style is consistent and follows best practices.',
  },
  functionality: {
    points: 16,
    feedback: 'Component functions well, but error handling could be improved.',
  },
  documentation: {
    points: 15,
    feedback: 'Minimal documentation, needs more detailed comments.',
  },
  overallFeedback: 'This submission demonstrates a good understanding of React components. The code is functional and follows most best practices. Areas for improvement include adding prop validation, enhancing error handling, and providing more comprehensive documentation.',
};

const GradeSubmissionsPage = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showAiDialog, setShowAiDialog] = useState(false);
  const location = useLocation();
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [grades, setGrades] = useState({});
  const [feedback, setFeedback] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [submissions, setSubmissions] = useState(mockSubmissions);

  useEffect(() => {
    // Check if we have navigation state with a selected submission
    if (location.state?.selectedSubmission) {
      setSelectedSubmission(location.state.selectedSubmission);
      if (location.state.showAiDialog) {
        setShowAiDialog(true);
      }
    }
  }, [location.state]);

  const handleGradeChange = (criteriaName, value) => {
    setGrades(prev => ({
      ...prev,
      [criteriaName]: Math.min(
        rubricCriteria.find(c => c.name === criteriaName).maxPoints,
        Math.max(0, parseInt(value) || 0)
      ),
    }));
  };

  const calculateTotal = () => {
    return Object.values(grades).reduce((sum, grade) => sum + (grade || 0), 0);
  };

  const applyAiSuggestions = () => {
    setGrades({
      'Component Structure': mockAiSuggestions.componentStructure.points,
      'Props Usage': mockAiSuggestions.propsUsage.points,
      'Code Style': mockAiSuggestions.codeStyle.points,
      'Functionality': mockAiSuggestions.functionality.points,
      'Documentation': mockAiSuggestions.documentation.points,
    });
    setFeedback(mockAiSuggestions.overallFeedback);
    setShowAiSuggestions(false);
  };

  const handleSubmitGrade = () => {
    // In a real app, this would send the grade to the backend
    console.log('Submitting grade:', {
      submissionId: selectedSubmission.id,
      grades,
      feedback,
      total: calculateTotal(),
    });

    // Show success message
    setShowSuccess(true);

    // Remove the graded submission from the list
    setSubmissions(prev => prev.filter(sub => sub.id !== selectedSubmission.id));

    // Reset form and go back to list after a delay
    setTimeout(() => {
      setSelectedSubmission(null);
      setGrades({});
      setFeedback('');
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <Box>
      {!selectedSubmission ? (
        <>
          <Typography variant="h6" gutterBottom>
            Submissions Pending Grading
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white' }}>Student</TableCell>
                  <TableCell sx={{ color: 'white' }}>Assignment</TableCell>
                  <TableCell sx={{ color: 'white' }}>Submitted Date</TableCell>
                  <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      {submission.studentName} ({submission.studentId})
                    </TableCell>
                    <TableCell>{submission.assignment}</TableCell>
                    <TableCell>
                      {new Date(submission.submittedDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<CodeIcon />}
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        Grade
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Box>
          <Button
            variant="outlined"
            onClick={() => setSelectedSubmission(null)}
            sx={{ mb: 2 }}
          >
            Back to List
          </Button>

          <Typography variant="h5" gutterBottom color="primary">
            Grade Submission
          </Typography>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Submission Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography><strong>Student:</strong> {selectedSubmission.studentName}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography><strong>Assignment:</strong> {selectedSubmission.assignment}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography>
                  <strong>Submitted:</strong> {new Date(selectedSubmission.submittedDate).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Submission Content
            </Typography>
            <Paper
              sx={{
                p: 2,
                backgroundColor: 'grey.100',
                fontFamily: 'monospace',
                overflow: 'auto',
              }}
            >
              <pre>{selectedSubmission.code}</pre>
            </Paper>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Grading Rubric</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setShowAiSuggestions(true)}
              >
                Request AI Grading Assistance
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Criteria</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rubricCriteria.map((criteria) => (
                    <TableRow key={criteria.name}>
                      <TableCell>{criteria.name}</TableCell>
                      <TableCell>{criteria.description}</TableCell>
                      <TableCell align="right" sx={{ width: '150px' }}>
                        <TextField
                          type="number"
                          size="small"
                          value={grades[criteria.name] || ''}
                          onChange={(e) => handleGradeChange(criteria.name, e.target.value)}
                          InputProps={{
                            endAdornment: <Typography>/ {criteria.maxPoints}</Typography>,
                          }}
                          sx={{ width: '100px' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}><strong>Total</strong></TableCell>
                    <TableCell align="right">
                      <strong>{calculateTotal()} / 100</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Instructor Feedback
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide detailed feedback to the student..."
            />
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setSelectedSubmission(null)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitGrade}
              disabled={Object.keys(grades).length === 0}
            >
              Submit Grade
            </Button>
          </Box>

          {/* AI Grading Suggestions Dialog */}
          <Dialog
            open={showAiSuggestions}
            onClose={() => setShowAiSuggestions(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>AI Grading Suggestions</DialogTitle>
            <DialogContent>
              <Alert severity="info" sx={{ mb: 2 }}>
                These are AI-generated suggestions based on the submission analysis.
              </Alert>
              
              {Object.entries(mockAiSuggestions).map(([key, value]) => {
                if (key === 'overallFeedback') return null;
                const criteria = key.replace(/([A-Z])/g, ' $1').toLowerCase();
                return (
                  <Box key={key} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {criteria.charAt(0).toUpperCase() + criteria.slice(1)}: {value.points} points
                    </Typography>
                    <Typography variant="body2">{value.feedback}</Typography>
                  </Box>
                );
              })}

              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>
                Overall Feedback
              </Typography>
              <Typography variant="body2">
                {mockAiSuggestions.overallFeedback}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowAiSuggestions(false)}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={applyAiSuggestions}>
                Apply AI Suggestions
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Grade submitted successfully! Returning to submissions list...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GradeSubmissionsPage; 