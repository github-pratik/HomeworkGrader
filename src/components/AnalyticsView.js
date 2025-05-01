import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

// Mock data for demonstration
const mockData = {
  scoreDistribution: [
    { score: '0-20', count: 2 },
    { score: '21-40', count: 5 },
    { score: '41-60', count: 8 },
    { score: '61-80', count: 12 },
    { score: '81-100', count: 15 },
  ],
  rubricPerformance: [
    { name: 'Code Quality', score: 75 },
    { name: 'Functionality', score: 82 },
    { name: 'Documentation', score: 68 },
    { name: 'Testing', score: 71 },
  ],
  submissionTimeline: [
    { date: '2024-03-10', count: 5 },
    { date: '2024-03-11', count: 8 },
    { date: '2024-03-12', count: 12 },
    { date: '2024-03-13', count: 15 },
    { date: '2024-03-14', count: 18 },
    { date: '2024-03-15', count: 20 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsView = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Score Distribution
          </Typography>
          <Box sx={{ height: 300 }}>
            <BarChart
              width={800}
              height={300}
              data={mockData.scoreDistribution}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="score" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Rubric Performance
          </Typography>
          <Box sx={{ height: 300 }}>
            <PieChart width={400} height={300}>
              <Pie
                data={mockData.rubricPerformance}
                cx={200}
                cy={150}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="score"
              >
                {mockData.rubricPerformance.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Submission Timeline
          </Typography>
          <Box sx={{ height: 300 }}>
            <LineChart
              width={400}
              height={300}
              data={mockData.submissionTimeline}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Summary Statistics
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4">42</Typography>
                <Typography color="text.secondary">Total Submissions</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4">75%</Typography>
                <Typography color="text.secondary">Average Score</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4">92%</Typography>
                <Typography color="text.secondary">Submission Rate</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4">15</Typography>
                <Typography color="text.secondary">Pending Reviews</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AnalyticsView; 