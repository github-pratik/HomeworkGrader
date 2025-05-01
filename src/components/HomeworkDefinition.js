import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const HomeworkDefinition = () => {
  const [homework, setHomework] = useState({
    title: '',
    description: '',
    dueDate: '',
    totalPoints: '',
    rubrics: [{ criterion: '', points: '' }],
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHomework((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRubricChange = (index, field, value) => {
    const newRubrics = [...homework.rubrics];
    newRubrics[index][field] = value;
    setHomework((prev) => ({
      ...prev,
      rubrics: newRubrics,
    }));
  };

  const addRubric = () => {
    setHomework((prev) => ({
      ...prev,
      rubrics: [...prev.rubrics, { criterion: '', points: '' }],
    }));
  };

  const removeRubric = (index) => {
    setHomework((prev) => ({
      ...prev,
      rubrics: prev.rubrics.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement submission logic
    console.log('Homework Definition:', homework);
    
    // Show success alert
    setShowAlert(true);
    
    // Clear all fields
    setHomework({
      title: '',
      description: '',
      dueDate: '',
      totalPoints: '',
      rubrics: [{ criterion: '', points: '' }],
    });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Define New Homework Assignment
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Assignment Title"
              name="title"
              value={homework.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Assignment Description"
              name="description"
              value={homework.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Due Date"
              name="dueDate"
              value={homework.dueDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Total Points"
              name="totalPoints"
              value={homework.totalPoints}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Grading Rubric
          </Typography>
          <List>
            {homework.rubrics.map((rubric, index) => (
              <ListItem key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      label="Criterion"
                      value={rubric.criterion}
                      onChange={(e) =>
                        handleRubricChange(index, 'criterion', e.target.value)
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Points"
                      value={rubric.points}
                      onChange={(e) =>
                        handleRubricChange(index, 'points', e.target.value)
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      edge="end"
                      onClick={() => removeRubric(index)}
                      disabled={homework.rubrics.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          <Button
            startIcon={<AddIcon />}
            onClick={addRubric}
            sx={{ mt: 1 }}
          >
            Add Criterion
          </Button>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Create Assignment
          </Button>
        </Box>
      </form>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Homework assignment created successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default HomeworkDefinition; 