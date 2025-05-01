import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Download as DownloadIcon,
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Mock data for analytics
const mockAnalytics = {
  totalStudents: 45,
  totalAssignments: 3,
  averageGrade: 82.5,
  assignmentStats: [
    {
      name: 'JavaScript Basics',
      averageGrade: 85.2,
      submissions: 45,
      graded: 42,
      pending: 3,
    },
    {
      name: 'React Components',
      averageGrade: 78.8,
      submissions: 44,
      graded: 38,
      pending: 6,
    },
    {
      name: 'API Integration',
      averageGrade: 83.5,
      submissions: 40,
      graded: 35,
      pending: 5,
    },
  ],
  gradeDistribution: {
    'A (90-100)': 12,
    'B (80-89)': 18,
    'C (70-79)': 10,
    'D (60-69)': 4,
    'F (0-59)': 1,
  },
  submissionTrend: [
    { date: '11/10', submissions: 15 },
    { date: '11/11', submissions: 25 },
    { date: '11/12', submissions: 35 },
    { date: '11/13', submissions: 38 },
    { date: '11/14', submissions: 42 },
    { date: '11/15', submissions: 44 },
    { date: '11/16', submissions: 45 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

const StatCard = ({ title, value, subtitle }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const AnalyticsPage = () => {
  const theme = useTheme();

  const handleDownloadPDF = () => {
    // In a real application, this would generate and download a PDF
    console.log('Downloading PDF...');
  };

  const handleDownloadCSV = () => {
    // Prepare CSV data
    const headers = ['Assignment', 'Average Grade', 'Submissions', 'Graded', 'Pending'];
    const rows = mockAnalytics.assignmentStats.map(stat => [
      stat.name,
      stat.averageGrade,
      stat.submissions,
      stat.graded,
      stat.pending
    ]);

    // Add grade distribution data
    rows.push([]);  // Empty row for separation
    rows.push(['Grade Distribution']);
    rows.push(['Grade Range', 'Number of Students', 'Percentage']);
    Object.entries(mockAnalytics.gradeDistribution).forEach(([range, count]) => {
      rows.push([
        range,
        count,
        ((count / mockAnalytics.totalStudents) * 100).toFixed(1) + '%'
      ]);
    });

    // Convert to CSV string
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'class_analytics.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Prepare data for pie chart
  const gradeDistributionData = Object.entries(mockAnalytics.gradeDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Class Performance Analytics
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<PdfIcon />}
            onClick={handleDownloadPDF}
            sx={{ mr: 2 }}
          >
            Download PDF Report
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadCSV}
          >
            Export CSV
          </Button>
        </Box>
      </Box>

      {/* Overview Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={mockAnalytics.totalStudents}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Assignments"
            value={mockAnalytics.totalAssignments}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Average Grade"
            value={`${mockAnalytics.averageGrade}%`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completion Rate"
            value="93%"
            subtitle="42/45 students"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Grade Distribution Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Grade Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {gradeDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Assignment Performance Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Assignment Performance
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAnalytics.assignmentStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="averageGrade" name="Average Grade" fill="#8884d8" />
                  <Bar dataKey="submissions" name="Submissions" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Submission Trend Line Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Submission Trend
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAnalytics.submissionTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="submissions"
                    name="Daily Submissions"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Detailed Tables Section */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Detailed Statistics
      </Typography>

      {/* Assignment Performance Table */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Assignment Details
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Assignment</TableCell>
                <TableCell align="right">Average Grade</TableCell>
                <TableCell align="right">Submissions</TableCell>
                <TableCell align="right">Graded</TableCell>
                <TableCell align="right">Pending</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockAnalytics.assignmentStats.map((assignment) => (
                <TableRow key={assignment.name}>
                  <TableCell>{assignment.name}</TableCell>
                  <TableCell align="right">{assignment.averageGrade}%</TableCell>
                  <TableCell align="right">{assignment.submissions}</TableCell>
                  <TableCell align="right">{assignment.graded}</TableCell>
                  <TableCell align="right">{assignment.pending}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Grade Distribution Table */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Grade Distribution Details
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Grade Range</TableCell>
                <TableCell align="right">Number of Students</TableCell>
                <TableCell align="right">Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(mockAnalytics.gradeDistribution).map(([range, count]) => (
                <TableRow key={range}>
                  <TableCell>{range}</TableCell>
                  <TableCell align="right">{count}</TableCell>
                  <TableCell align="right">
                    {((count / mockAnalytics.totalStudents) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AnalyticsPage; 