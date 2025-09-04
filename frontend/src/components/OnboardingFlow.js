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
  Fade,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelIcons } from './PixelIcons';

const onboardingSteps = [
  {
    title: 'Unified Intelligence Disciplines',
    subtitle: 'Ten powerful intelligence modules in one platform',
    description: 'Access OSINT, GEOINT, HUMINT, SIGINT, SOCMINT, and more from a single, unified interface designed for professional analysts.',
    icon: 'Shield',
    features: [
      { icon: 'Security', text: 'Open Source Intelligence (OSINT)' },
      { icon: 'Map', text: 'Geospatial Intelligence (GEOINT)' },
      { icon: 'Psychology', text: 'Human Intelligence (HUMINT)' },
      { icon: 'Share', text: 'Social Media Intelligence (SOCMINT)' },
      { icon: 'NetworkCheck', text: 'Network & Crypto Analysis' }
    ],
    gradient: 'linear-gradient(135deg, #6750A4 0%, #7C4DFF 100%)'
  },
  {
    title: 'Real-Time Threat Alerts',
    subtitle: 'Stay ahead with At A Glance intelligence',
    description: 'Get instant notifications about emerging threats, suspicious activities, and critical intelligence updates across all your monitored assets.',
    icon: 'TrendingUp',
    features: [
      { icon: 'Notifications', text: 'Live threat monitoring' },
      { icon: 'Warning', text: 'Severity-based alerts' },
      { icon: 'Analytics', text: 'Cross-platform correlation' },
      { icon: 'Security', text: 'Automated risk assessment' },
      { icon: 'Tune', text: 'Custom alert rules' }
    ],
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'
  },
  {
    title: 'Secure, Free & Open-Source',
    subtitle: 'Enterprise-grade security meets transparency',
    description: 'Built on open-source tools with enterprise security standards. Your data stays private while leveraging the power of community-driven intelligence tools.',
    icon: 'Lock',
    features: [
      { icon: 'Shield', text: 'End-to-end encryption' },
      { icon: 'DeviceHub', text: 'Local data processing' },
      { icon: 'Code', text: 'Open-source transparency' },
      { icon: 'Key', text: 'No vendor lock-in' },
      { icon: 'Groups', text: 'Community-driven updates' }
    ],
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)'
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
    setBiometricComplete(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };
  
  const currentSlide = onboardingSteps[currentStep];
  const IconComponent = PixelIcons[currentSlide.icon];
  
  if (showBiometric) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6750A4 0%, #7C4DFF 25%, #3F51B5 50%, #2196F3 75%, #00BCD4 100%)',
          p: 3,
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "anticipate" }}
          >
            <Paper
              elevation={8}
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <motion.div
                animate={biometricComplete ? 
                  { scale: 1.2, rotateY: 360 } : 
                  { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } }
                }
                transition={{ duration: 0.6 }}
              >
                <Box sx={{ 
                  color: biometricComplete ? theme.palette.success.main : theme.palette.primary.main,
                  mb: 3 
                }}>
                  {biometricComplete ? (
                    <PixelIcons.CheckCircle size={80} fill={1} />
                  ) : (
                    <PixelIcons.Shield size={80} />
                  )}
                </Box>
              </motion.div>
              
              <Typography variant="h4" gutterBottom fontWeight="500" color="text.primary">
                {biometricComplete ? 'Authentication Complete' : 'Secure Access'}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                {biometricComplete 
                  ? 'Welcome to OSINT Nexus! Initializing your intelligence dashboard...' 
                  : 'Choose your preferred authentication method'
                }
              </Typography>
              
              {!biometricComplete && (
                <Stack direction="row" spacing={2} justifyContent="center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PixelIcons.Fingerprint />}
                      onClick={() => handleBiometricAuth('fingerprint')}
                      sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1.5,
                        fontSize: '1rem',
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
                      startIcon={<PixelIcons.FaceRetouchingNatural />}
                      onClick={() => handleBiometricAuth('face')}
                      sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1.5,
                        fontSize: '1rem',
                      }}
                    >
                      Face ID
                    </Button>
                  </motion.div>
                </Stack>
              )}
              
              {biometricComplete && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: "backOut" }}
                >
                  <Box sx={{ mt: 3, color: theme.palette.success.main }}>
                    <PixelIcons.CheckCircle size={48} fill={1} />
                  </Box>
                </motion.div>
              )}
            </Paper>
          </motion.div>
        </Container>
      </Box>
    );
  }
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: currentSlide.gradient,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </Box>

      {/* Progress Indicator */}
      <Container maxWidth="lg" sx={{ pt: 3, position: 'relative', zIndex: 1 }}>
        <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
          {onboardingSteps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': { 
                    color: index <= currentStep ? 'white' : 'rgba(255, 255, 255, 0.6)',
                    fontFamily: '"Google Sans", sans-serif',
                  },
                  '& .MuiStepIcon-root': { 
                    color: index <= currentStep ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  },
                }}
              />
            </Step>
          ))}
        </Stepper>
      </Container>
      
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: 15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  p: isMobile ? 3 : 5,
                  maxWidth: 900,
                  mx: 'auto',
                }}
              >
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <motion.div
                      animate={{ 
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Box sx={{ mb: 3 }}>
                        <IconComponent size={80} weight={300} />
                      </Box>
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
                  
                  {/* Features Grid */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                      Key Features
                    </Typography>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 2,
                      }}
                    >
                      {currentSlide.features.map((feature, index) => {
                        const FeatureIcon = PixelIcons[feature.icon];
                        return (
                          <motion.div
                            key={feature.text}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.4, ease: "easeOut" }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: 3,
                                p: 2.5,
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  background: 'rgba(255, 255, 255, 0.2)',
                                  transform: 'translateY(-2px)',
                                },
                              }}
                            >
                              <FeatureIcon size={28} style={{ marginRight: 16, color: '#4ECDC4' }} />
                              <Typography variant="body1" fontWeight="500">
                                {feature.text}
                              </Typography>
                            </Box>
                          </motion.div>
                        );
                      })}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </Container>
      </Box>
      
      {/* Navigation */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 3,
          }}
        >
          <Button
            startIcon={<PixelIcons.ArrowBack />}
            onClick={handleBack}
            disabled={currentStep === 0}
            sx={{
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '&:hover': {
                borderColor: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
              },
              '&:disabled': {
                color: 'rgba(255, 255, 255, 0.5)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              borderRadius: 3,
              px: 3,
            }}
            variant="outlined"
          >
            Back
          </Button>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {onboardingSteps.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  scale: index === currentStep ? 1.2 : 1,
                  opacity: index === currentStep ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: index === currentStep ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setCurrentStep(index)}
                />
              </motion.div>
            ))}
          </Box>
          
          <Button
            endIcon={<PixelIcons.ArrowForward />}
            onClick={handleNext}
            sx={{
              background: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.9)',
                transform: 'translateY(-1px)',
              },
              borderRadius: 3,
              px: 3,
              py: 1,
              fontSize: '1rem',
              fontWeight: 500,
            }}
            variant="contained"
          >
            {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default OnboardingFlow;