import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DefineHomeworkPage from './pages/DefineHomeworkPage';
import ReviewSubmissionsPage from './pages/ReviewSubmissionsPage';
import GradeSubmissionsPage from './pages/GradeSubmissionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/define-homework"
            element={
              <PrivateRoute>
                <Layout>
                  <DefineHomeworkPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/review-submissions"
            element={
              <PrivateRoute>
                <Layout>
                  <ReviewSubmissionsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/grade-submissions"
            element={
              <PrivateRoute>
                <Layout>
                  <GradeSubmissionsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Layout>
                  <AnalyticsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 