import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// Theme
import { createPixelTheme } from './theme/PixelTheme';

// Components
import OnboardingFlow from './components/OnboardingFlow';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Investigations from './pages/Investigations';
import Widgets from './pages/Widgets';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import ModuleScreen from './components/ModuleScreen';

// Material You color extraction simulation
const extractDynamicColors = () => {
  // In a real app, this would extract colors from wallpaper
  // For now, we'll cycle through Pixel-style color schemes
  const colorSchemes = [
    { primary: '#6750A4', name: 'Pixel Purple' },
    { primary: '#1976D2', name: 'Pixel Blue' },
    { primary: '#D32F2F', name: 'Pixel Red' },
    { primary: '#388E3C', name: 'Pixel Green' },
    { primary: '#F57C00', name: 'Pixel Orange' },
    { primary: '#7B1FA2', name: 'Pixel Deep Purple' },
  ];
  
  const saved = localStorage.getItem('osint-nexus-color-scheme');
  if (saved) {
    return JSON.parse(saved);
  }
  
  return colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
};

function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [themeMode, setThemeMode] = useState('light');
  const [colorScheme, setColorScheme] = useState(extractDynamicColors());
  const [isLoading, setIsLoading] = useState(true);
  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      // Check onboarding status
      const onboardingComplete = localStorage.getItem('osint-nexus-onboarding-complete');
      if (onboardingComplete) {
        setHasCompletedOnboarding(true);
      }
      
      // Load theme preferences
      const savedTheme = localStorage.getItem('osint-nexus-theme');
      if (savedTheme) {
        setThemeMode(savedTheme);
      } else if (prefersDarkMode) {
        setThemeMode('dark');
      }
      
      // Hide splash screen after minimum display time
      setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        if (splashScreen) {
          splashScreen.style.opacity = '0';
          setTimeout(() => {
            splashScreen.style.display = 'none';
            setIsLoading(false);
          }, 500);
        } else {
          setIsLoading(false);
        }
      }, 2500);
    };
    
    initializeApp();
  }, [prefersDarkMode]);
  
  const theme = createPixelTheme(themeMode, colorScheme.primary);
  
  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('osint-nexus-onboarding-complete', 'true');
  };
  
  const handleThemeChange = (mode) => {
    setThemeMode(mode);
    localStorage.setItem('osint-nexus-theme', mode);
  };
  
  const handleColorSchemeChange = (scheme) => {
    setColorScheme(scheme);
    localStorage.setItem('osint-nexus-color-scheme', JSON.stringify(scheme));
  };

  // Don't render anything while splash screen is showing
  if (isLoading) {
    return null;
  }

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
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <OnboardingFlow onComplete={handleOnboardingComplete} />
            </motion.div>
          ) : (
            <motion.div
              key="main-app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <MainLayout
                themeMode={themeMode}
                onThemeChange={handleThemeChange}
                colorScheme={colorScheme}
                onColorSchemeChange={handleColorSchemeChange}
              >
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/investigations" element={<Investigations />} />
                  <Route path="/widgets" element={<Widgets />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/module/:moduleId" element={<ModuleScreen />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
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