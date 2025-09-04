import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  IconButton,
  Fade,
  Slide,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Security,
  Dashboard,
  Notifications,
  ArrowForward,
  ArrowBack,
  Fingerprint,
  Face,
  CheckCircle,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const onboardingSteps = [
  {
    title: 'Unified Intelligence Disciplines',
    subtitle: 'Ten powerful intelligence modules in one platform',
    description: 'Access OSINT, GEOINT, HUMINT, SIGINT, SOCMINT, and more from a single, unified interface designed for professional analysts.',
    icon: Security,
    features: [
      'Open Source Intelligence (OSINT)',
      'Geospatial Intelligence (GEOINT)',
      'Human Intelligence (HUMINT)',
      'Social Media Intelligence (SOCMINT)',
      'Network & Crypto Analysis'
    ],
    color: '#1976d2'
  },
  {
    title: 'Real-Time Threat Alerts',
    subtitle: 'Stay ahead with At A Glance intelligence',
    description: 'Get instant notifications about emerging threats, suspicious activities, and critical intelligence updates across all your monitored assets.',
    icon: Dashboard,
    features: [
      'Live threat monitoring',
      'Severity-based alerts',
      'Cross-platform correlation',
      'Automated risk assessment',
      'Custom alert rules'
    ],
    color: '#f57c00'
  },
  {
    title: 'Secure, Free & Open-Source',
    subtitle: 'Enterprise-grade security meets transparency',
    description: 'Built on open-source tools with enterprise security standards. Your data stays private while leveraging the power of community-driven intelligence tools.',
    icon: Notifications,
    features: [
      'End-to-end encryption',
      'Local data processing',
      'Open-source transparency',
      'No vendor lock-in',
      'Community-driven updates'
    ],
    color: '#388e3c'
  }
];

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showBiometric, setShowBiometric] = useState(false);
  const [biometricComplete, setBiometricComplete] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowBiometric(true);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleBiometricAuth = (method) => {
    // Simulate biometric authentication
    setTimeout(() => {
      setBiometricComplete(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    }, 2000);
  };
  
  const currentSlide = onboardingSteps[currentStep];
  const IconComponent = currentSlide.icon;
  
  if (showBiometric) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1976d2, #1565c0)',
          padding: 3,
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={8}
            sx={{
              padding: 4,
              borderRadius: 3,
              textAlign: 'center',
              maxWidth: 400,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <motion.div
              animate={biometricComplete ? { scale: 1.2, color: '#4caf50' } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Security sx={{ fontSize: 80, color: biometricComplete ? '#4caf50' : '#1976d2', mb: 2 }} />
            </motion.div>
            
            <Typography variant="h4" gutterBottom fontWeight="500">
              {biometricComplete ? 'Authentication Complete' : 'Secure Access'}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {biometricComplete 
                ? 'Welcome to OSINT Nexus! Redirecting to dashboard...' 
                : 'Choose your preferred authentication method'
              }
            </Typography>
            
            {!biometricComplete && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Fingerprint />}
                    onClick={() => handleBiometricAuth('fingerprint')}
                    sx={{
                      borderRadius: 3,
                      padding: '12px 24px',
                      borderColor: '#1976d2',
                      color: '#1976d2',
                    }}
                  >
                    Fingerprint
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Face />}
                    onClick={() => handleBiometricAuth('face')}
                    sx={{
                      borderRadius: 3,
                      padding: '12px 24px',
                      borderColor: '#1976d2',
                      color: '#1976d2',
                    }}
                  >
                    Face ID
                  </Button>
                </motion.div>
              </Box>
            )}
            
            {biometricComplete && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <CheckCircle sx={{ fontSize: 60, color: '#4caf50', mt: 2 }} />
              </motion.div>
            )}
          </Paper>
        </motion.div>
      </Box>
    );
  }
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${currentSlide.color}, ${currentSlide.color}dd)`,
        color: 'white',
      }}
    >
      {/* Progress Indicator */}
      <Box sx={{ p: 3 }}>
        <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
          {onboardingSteps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': { color: 'rgba(255, 255, 255, 0.8)' },
                  '& .MuiStepLabel-label.Mui-active': { color: 'white' },
                  '& .MuiStepIcon-root': { color: 'rgba(255, 255, 255, 0.5)' },
                  '& .MuiStepIcon-root.Mui-active': { color: 'white' },
                }}
              />
            </Step>
          ))}
        </Stepper>
      </Box>
      
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', maxWidth: 800 }}
          >
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                p: isMobile ? 2 : 4,
              }}
            >
              <CardContent>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <motion.div
                    animate={{ rotateY: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <IconComponent sx={{ fontSize: 80, mb: 2 }} />
                  </motion.div>
                  
                  <Typography variant="h3" component="h1" gutterBottom fontWeight="500">
                    {currentSlide.title}
                  </Typography>
                  
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                    {currentSlide.subtitle}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 600, mx: 'auto' }}>
                    {currentSlide.description}
                  </Typography>
                </Box>
                
                {/* Features List */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                    Key Features
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: 2,
                    }}
                  >
                    {currentSlide.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 2,
                            p: 2,
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                          }}
                        >
                          <CheckCircle sx={{ mr: 2, color: '#4caf50' }} />
                          <Typography variant="body2">{feature}</Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </Box>
      
      {/* Navigation */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          disabled={currentStep === 0}
          sx={{
            color: 'white',
            borderColor: 'rgba(255, 255, 255, 0.5)',
            '&:hover': {
              borderColor: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
            },
          }}
          variant="outlined"
        >
          Back
        </Button>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {onboardingSteps.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: index === currentStep ? 'white' : 'rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
        
        <Button
          endIcon={<ArrowForward />}
          onClick={handleNext}
          sx={{
            background: 'white',
            color: currentSlide.color,
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.9)',
            },
          }}
          variant="contained"
        >
          {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingFlow;