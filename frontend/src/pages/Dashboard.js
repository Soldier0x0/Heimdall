import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  LinearProgress,
  Chip,
  Avatar,
  IconButton,
  Skeleton,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
  Fade,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelIcons } from '../components/PixelIcons';
import axios from 'axios';

const moduleIconMap = {
  OSINT: 'Security',
  GEOINT: 'Map',
  PEOPLEOSINT: 'PersonSearch',
  HUMINT: 'Psychology',
  SIGINT: 'SignalCellularAlt',
  SOCMINT: 'Groups',
  Darknet: 'VisibilityOff',
  Cryptanalysis: 'Lock',
  Network: 'NetworkCheck',
  Blockchain: 'CurrencyBitcoin',
};

const moduleColors = {
  OSINT: '#6750A4',
  GEOINT: '#2D7D32',
  PEOPLEOSINT: '#F57C00',
  HUMINT: '#7B1FA2',
  SIGINT: '#D32F2F',
  SOCMINT: '#1976D2',
  Darknet: '#424242',
  Cryptanalysis: '#FF6F00',
  Network: '#388E3C',
  Blockchain: '#FF9800',
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const [overviewResponse, modulesResponse] = await Promise.all([
        axios.get(`${backendUrl}/api/dashboard/overview`),
        axios.get(`${backendUrl}/api/modules`)
      ]);
      
      setDashboardData({
        ...overviewResponse.data,
        modules: modulesResponse.data.modules
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Enhanced mock data for development
      setDashboardData({
        alerts: [
          {
            id: '1',
            title: 'Network Anomaly Detected',
            severity: 'high',
            description: 'Suspicious traffic patterns from Eastern Europe',
            timestamp: new Date(Date.now() - 15 * 60 * 1000)
          },
          {
            id: '2',
            title: 'New Dark Web Mention Found',
            severity: 'medium',
            description: 'Target organization mentioned in underground forums',
            timestamp: new Date(Date.now() - 45 * 60 * 1000)
          },
          {
            id: '3',
            title: 'Social Media Profile Changes',
            severity: 'low',
            description: 'Key person of interest updated LinkedIn profile',
            timestamp: new Date(Date.now() - 120 * 60 * 1000)
          }
        ],
        recent_activities: [
          {
            id: '1',
            module: 'OSINT',
            target: 'example.com',
            status: 'completed',
            timestamp: new Date(Date.now() - 30 * 60 * 1000)
          },
          {
            id: '2',
            module: 'SOCMINT',
            target: '@suspicious_account',
            status: 'in-progress',
            timestamp: new Date(Date.now() - 60 * 60 * 1000)
          },
          {
            id: '3',
            module: 'Darknet',
            target: 'forum.onion',
            status: 'completed',
            timestamp: new Date(Date.now() - 90 * 60 * 1000)
          },
          {
            id: '4',
            module: 'GEOINT',
            target: '40.7128,-74.0060',
            status: 'failed',
            timestamp: new Date(Date.now() - 120 * 60 * 1000)
          },
          {
            id: '5',
            module: 'Network',
            target: '192.168.1.0/24',
            status: 'in-progress',
            timestamp: new Date(Date.now() - 150 * 60 * 1000)
          }
        ],
        module_stats: Object.keys(moduleColors).map(module => ({
          module,
          success_rate: Math.random() * 0.25 + 0.70, // 70-95%
          total_runs: Math.floor(Math.random() * 450) + 50,
          last_run: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
        })),
        modules: Object.entries(moduleColors).map(([key, color]) => ({
          id: key.toLowerCase(),
          name: key,
          title: getModuleTitle(key),
          description: getModuleDescription(key),
          tools: getModuleTools(key),
          icon: key.toLowerCase(),
          color
        }))
      });
    } finally {
      setLoading(false);
    }
  };

  const getModuleTitle = (module) => {
    const titles = {
      OSINT: 'Open Source Intelligence',
      GEOINT: 'Geospatial Intelligence',
      PEOPLEOSINT: 'People Intelligence',
      HUMINT: 'Human Intelligence',
      SIGINT: 'Signals Intelligence',
      SOCMINT: 'Social Media Intelligence',
      Darknet: 'Dark Web Monitoring',
      Cryptanalysis: 'Cryptographic Analysis',
      Network: 'Network Analysis',
      Blockchain: 'Blockchain Analysis'
    };
    return titles[module] || module;
  };

  const getModuleDescription = (module) => {
    const descriptions = {
      OSINT: 'Gather intelligence from public sources',
      GEOINT: 'Location-based intelligence and mapping',
      PEOPLEOSINT: 'Person-focused intelligence gathering',
      HUMINT: 'Intelligence from human sources',
      SIGINT: 'Electronic signals intelligence',
      SOCMINT: 'Social media intelligence analysis',
      Darknet: 'Monitor dark web activities',
      Cryptanalysis: 'Cryptographic analysis and breaking',
      Network: 'Network infrastructure analysis',
      Blockchain: 'Cryptocurrency investigation'
    };
    return descriptions[module] || 'Intelligence analysis';
  };

  const getModuleTools = (module) => {
    const tools = {
      OSINT: ['theHarvester', 'Sherlock', 'SpiderFoot'],
      GEOINT: ['Satellite Imagery', 'GPS Analysis'],
      PEOPLEOSINT: ['Social Profiles', 'Background Checks'],
      HUMINT: ['Persona Creation', 'Chat Simulation'],
      SIGINT: ['Network Scanning', 'RF Monitoring'],
      SOCMINT: ['Sentiment Analysis', 'Network Mapping'],
      Darknet: ['TOR Analysis', 'Hidden Services'],
      Cryptanalysis: ['Hashcat', 'John the Ripper'],
      Network: ['Nmap', 'Wireshark'],
      Blockchain: ['Address Analysis', 'Transaction Tracking']
    };
    return tools[module] || ['Analysis Tools'];
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return theme.palette.error.main;
      case 'medium': return theme.palette.warning.main;
      case 'low': return theme.palette.success.main;
      default: return theme.palette.text.secondary;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return theme.palette.success.main;
      case 'in-progress': return theme.palette.warning.main;
      case 'failed': return theme.palette.error.main;
      default: return theme.palette.text.secondary;
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      return `${hours}h ago`;
    }
  };

  const handleModuleClick = (moduleId) => {
    navigate(`/module/${moduleId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={160} sx={{ mb: 4, borderRadius: 4 }} />
        <Skeleton variant="rectangular" height={120} sx={{ mb: 4, borderRadius: 3 }} />
        <Grid container spacing={3}>
          {[...Array(10)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" height={240} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* At A Glance Panel - Enhanced Pixel Style */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.main}05)`,
            border: `1px solid ${theme.palette.primary.main}20`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '200px',
              height: '200px',
              background: `radial-gradient(circle, ${theme.palette.primary.main}10, transparent)`,
              borderRadius: '50%',
              transform: 'translate(50%, -50%)',
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PixelIcons.TrendingUp 
                size={32} 
                style={{ 
                  marginRight: 16, 
                  color: theme.palette.primary.main 
                }} 
              />
              <Typography 
                variant="h4" 
                fontWeight="500" 
                sx={{ fontFamily: '"Product Sans", sans-serif' }}
              >
                At A Glance
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              {dashboardData?.alerts?.slice(0, 3).map((alert, index) => (
                <Grid item xs={12} md={4} key={alert.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <Card
                      sx={{
                        background: theme.palette.background.paper,
                        borderRadius: 3,
                        border: `2px solid ${getSeverityColor(alert.severity)}20`,
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          boxShadow: `0 8px 32px ${getSeverityColor(alert.severity)}30`,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {/* Severity Bar */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: getSeverityColor(alert.severity),
                        }}
                      />
                      
                      <CardContent sx={{ pt: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                          <PixelIcons.Warning 
                            style={{ color: getSeverityColor(alert.severity) }} 
                            size={24}
                          />
                          <Chip
                            label={alert.severity.toUpperCase()}
                            size="small"
                            sx={{
                              background: getSeverityColor(alert.severity),
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                              fontFamily: '"Google Sans", sans-serif',
                            }}
                          />
                        </Stack>
                        
                        <Typography variant="h6" fontWeight="500" gutterBottom sx={{ fontFamily: '"Google Sans", sans-serif' }}>
                          {alert.title}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5 }}>
                          {alert.description}
                        </Typography>
                        
                        <Typography variant="caption" color="text.disabled">
                          {formatTimeAgo(alert.timestamp)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </motion.div>

      {/* Recent Activities - Enhanced */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 3,
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <PixelIcons.Schedule 
              size={28} 
              style={{ 
                marginRight: 12, 
                color: theme.palette.primary.main 
              }} 
            />
            <Typography 
              variant="h5" 
              fontWeight="500" 
              sx={{ fontFamily: '"Product Sans", sans-serif' }}
            >
              Recent Activities
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            overflowX: 'auto', 
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 6,
            },
            '&::-webkit-scrollbar-track': {
              background: theme.palette.background.default,
              borderRadius: 3,
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.primary.main,
              borderRadius: 3,
            },
          }}>
            {dashboardData?.recent_activities?.map((activity, index) => {
              const IconComponent = PixelIcons[moduleIconMap[activity.module]];
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Card
                    sx={{
                      minWidth: 220,
                      cursor: 'pointer',
                      borderRadius: 3,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.shadows[4],
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack direction="row" alignItems="center" spacing={1.5} mb={1.5}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            background: `${moduleColors[activity.module]}20`,
                          }}
                        >
                          <IconComponent 
                            size={18} 
                            style={{ color: moduleColors[activity.module] }}
                          />
                        </Avatar>
                        <Typography variant="subtitle2" fontWeight="500">
                          {activity.module}
                        </Typography>
                      </Stack>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        gutterBottom
                        sx={{ 
                          fontFamily: 'monospace',
                          fontSize: '0.8rem',
                          mb: 1.5,
                        }}
                      >
                        {activity.target}
                      </Typography>
                      
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Chip
                          label={activity.status}
                          size="small"
                          sx={{
                            background: getStatusColor(activity.status),
                            color: 'white',
                            fontSize: '0.7rem',
                            fontWeight: 500,
                            height: 24,
                          }}
                        />
                        <Typography variant="caption" color="text.disabled">
                          {formatTimeAgo(activity.timestamp)}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </Box>
        </Paper>
      </motion.div>

      {/* Intelligence Modules Grid - Enhanced */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h5" 
            fontWeight="500" 
            gutterBottom 
            sx={{ 
              fontFamily: '"Product Sans", sans-serif',
              mb: 3,
            }}
          >
            Intelligence Disciplines
          </Typography>
          
          <Grid container spacing={3}>
            {dashboardData?.modules?.map((module, index) => {
              const IconComponent = PixelIcons[moduleIconMap[module.name]];
              const moduleStats = dashboardData.module_stats?.find(stat => stat.module === module.name);
              const successRate = moduleStats?.success_rate || 0.8;
              
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={module.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <Card
                      onClick={() => handleModuleClick(module.id)}
                      sx={{
                        height: '100%',
                        cursor: 'pointer',
                        borderRadius: 4,
                        border: `1px solid ${theme.palette.divider}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        background: theme.palette.background.paper,
                        '&:hover': {
                          boxShadow: `0 12px 40px ${module.color}30`,
                          borderColor: module.color,
                          '& .module-icon': {
                            transform: 'scale(1.1) rotate(5deg)',
                            color: module.color,
                          },
                          '& .success-ring': {
                            transform: 'scale(1.05)',
                          },
                        },
                      }}
                    >
                      {/* Success Rate Ring Background */}
                      <Box
                        className="success-ring"
                        sx={{
                          position: 'absolute',
                          top: -25,
                          right: -25,
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: `conic-gradient(${module.color} ${successRate * 360}deg, ${theme.palette.background.default} 0deg)`,
                          opacity: 0.15,
                          transition: 'all 0.3s ease',
                        }}
                      />
                      
                      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                          <Avatar
                            sx={{
                              background: `${module.color}15`,
                              width: 48,
                              height: 48,
                            }}
                          >
                            <IconComponent 
                              className="module-icon"
                              size={28}
                              style={{ 
                                color: module.color,
                                transition: 'all 0.3s ease',
                              }}
                            />
                          </Avatar>
                          
                          <Box flex={1}>
                            <Typography 
                              variant="h6" 
                              fontWeight="500"
                              sx={{ fontFamily: '"Product Sans", sans-serif' }}
                            >
                              {module.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {moduleStats?.total_runs || 0} total runs
                            </Typography>
                          </Box>
                        </Stack>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ mb: 'auto', lineHeight: 1.5 }}
                        >
                          {module.description}
                        </Typography>
                        
                        <Box sx={{ mt: 3 }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="caption" color="text.secondary" fontWeight="500">
                              Success Rate
                            </Typography>
                            <Typography variant="caption" fontWeight="600" color={module.color}>
                              {Math.round(successRate * 100)}%
                            </Typography>
                          </Stack>
                          
                          <LinearProgress
                            variant="determinate"
                            value={successRate * 100}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: `${module.color}20`,
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: module.color,
                                borderRadius: 3,
                              },
                            }}
                          />
                        </Box>
                        
                        <Stack direction="row" flexWrap="wrap" gap={0.5} mt={2}>
                          {module.tools?.slice(0, 2).map((tool) => (
                            <Chip
                              key={tool}
                              label={tool}
                              size="small"
                              variant="outlined"
                              sx={{ 
                                fontSize: '0.7rem',
                                height: 22,
                                borderColor: `${module.color}40`,
                                color: module.color,
                                '&:hover': {
                                  background: `${module.color}10`,
                                },
                              }}
                            />
                          ))}
                          {module.tools?.length > 2 && (
                            <Chip
                              label={`+${module.tools.length - 2}`}
                              size="small"
                              sx={{ 
                                fontSize: '0.7rem',
                                height: 22,
                                background: `${module.color}15`,
                                color: module.color,
                                border: 'none',
                              }}
                            />
                          )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Dashboard;