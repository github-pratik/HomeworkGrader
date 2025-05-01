import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Slider,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';

const GradingInterface = ({ submission, rubrics }) => {
  const [grades, setGrades] = useState(
    rubrics.reduce((acc, rubric) => {
      acc[rubric.criterion] = {
        score: 0,
        feedback: '',
      };
      return acc;
    }, {})
  );

  const handleScoreChange = (criterion, value) => {
    setGrades((prev) => ({
      ...prev,
      [criterion]: {
        ...prev[criterion],
        score: value,
      },
    }));
  };

  const handleFeedbackChange = (criterion, value) => {
    setGrades((prev) => ({
      ...prev,
      [criterion]: {
        ...prev[criterion],
        feedback: value,
      },
    }));
  };

  const calculateTotalScore = () => {
    return Object.entries(grades).reduce((total, [criterion, grade]) => {
      const rubric = rubrics.find((r) => r.criterion === criterion);
      return total + (grade.score * rubric.points) / 100;
    }, 0);
  };

  const handleSubmit = () => {
    // TODO: Implement submission logic
    console.log('Grades:', grades);
    console.log('Total Score:', calculateTotalScore());
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Student Submission
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="body1">{submission?.content || 'No submission content available'}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Grading Rubric
          </Typography>
          <List>
            {rubrics.map((rubric, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        {rubric.criterion}
                        <Chip
                          label={`${rubric.points} points`}
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ px: 2 }}>
                        <Slider
                          value={grades[rubric.criterion].score}
                          onChange={(_, value) =>
                            handleScoreChange(rubric.criterion, value)
                          }
                          valueLabelDisplay="auto"
                          step={1}
                          marks
                          min={0}
                          max={100}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label="Feedback"
                        value={grades[rubric.criterion].feedback}
                        onChange={(e) =>
                          handleFeedbackChange(rubric.criterion, e.target.value)
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                {index < rubrics.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Total Score: {calculateTotalScore().toFixed(1)} / {rubrics.reduce((sum, r) => sum + r.points, 0)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Submit Grade
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default GradingInterface; 