import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import OnboardingFlow from './components/OnboardingFlow';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Investigations from './pages/Investigations';
import Widgets from './pages/Widgets';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import ModuleScreen from './components/ModuleScreen';

// Theme configuration
const createAppTheme = (mode, primaryColor = '#1976d2') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
        light: mode === 'light' ? '#42a5f5' : '#64b5f6',
        dark: mode === 'light' ? '#1565c0' : '#0d47a1',
      },
      secondary: {
        main: '#f57c00',
        light: '#ffb74d',
        dark: '#ef6c00',
      },
      background: {
        default: mode === 'light' ? '#f8f9fa' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      surface: {
        main: mode === 'light' ? '#ffffff' : '#1e1e1e',
        variant: mode === 'light' ? '#f5f5f5' : '#2d2d2d',
      },
    },
    typography: {
      fontFamily: '"Google Sans", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 500,
        letterSpacing: '-0.01562em',
      },
      h2: {
        fontWeight: 500,
        letterSpacing: '-0.00833em',
      },
      h3: {
        fontWeight: 500,
        letterSpacing: '0em',
      },
      h4: {
        fontWeight: 500,
        letterSpacing: '0.00735em',
      },
      h5: {
        fontWeight: 500,
        letterSpacing: '0em',
      },
      h6: {
        fontWeight: 500,
        letterSpacing: '0.0075em',
      },
      subtitle1: {
        fontWeight: 400,
        letterSpacing: '0.00938em',
      },
      subtitle2: {
        fontWeight: 500,
        letterSpacing: '0.00714em',
      },
      body1: {
        fontWeight: 400,
        letterSpacing: '0.03125em',
      },
      body2: {
        fontWeight: 400,
        letterSpacing: '0.01786em',
      },
      button: {
        fontWeight: 500,
        letterSpacing: '0.08929em',
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light' 
              ? '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)'
              : '0px 1px 3px rgba(255, 255, 255, 0.12), 0px 1px 2px rgba(255, 255, 255, 0.24)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            padding: '8px 24px',
            minHeight: 48,
          },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            borderRadius: '24px 24px 0 0',
            boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiBottomSheet: {
        styleOverrides: {
          root: {
            borderRadius: '24px 24px 0 0',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderBottom: mode === 'light' 
              ? '1px solid rgba(0, 0, 0, 0.12)' 
              : '1px solid rgba(255, 255, 255, 0.12)',
          },
        },
      },
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  });
};

function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [themeMode, setThemeMode] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#1976d2');
  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('osint-nexus-onboarding-complete');
    if (onboardingComplete) {
      setHasCompletedOnboarding(true);
    }
    
    // Load theme preferences
    const savedTheme = localStorage.getItem('osint-nexus-theme');
    const savedColor = localStorage.getItem('osint-nexus-primary-color');
    
    if (savedTheme) {
      setThemeMode(savedTheme);
    } else if (prefersDarkMode) {
      setThemeMode('dark');
    }
    
    if (savedColor) {
      setPrimaryColor(savedColor);
    }
  }, [prefersDarkMode]);
  
  const theme = createAppTheme(themeMode, primaryColor);
  
  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('osint-nexus-onboarding-complete', 'true');
  };
  
  const handleThemeChange = (mode) => {
    setThemeMode(mode);
    localStorage.setItem('osint-nexus-theme', mode);
  };
  
  const handlePrimaryColorChange = (color) => {
    setPrimaryColor(color);
    localStorage.setItem('osint-nexus-primary-color', color);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AnimatePresence mode="wait">
          {!hasCompletedOnboarding ? (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OnboardingFlow onComplete={handleOnboardingComplete} />
            </motion.div>
          ) : (
            <motion.div
              key="main-app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MainLayout
                themeMode={themeMode}
                onThemeChange={handleThemeChange}
                primaryColor={primaryColor}
                onPrimaryColorChange={handlePrimaryColorChange}
              >
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/investigations" element={<Investigations />} />
                  <Route path="/widgets" element={<Widgets />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/module/:moduleId" element={<ModuleScreen />} />
                </Routes>
              </MainLayout>
            </motion.div>
          )}
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}

export default App;