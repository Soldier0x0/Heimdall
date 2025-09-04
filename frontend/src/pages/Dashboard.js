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
} from '@mui/material';
import {
  Security,
  Map,
  Person,
  Psychology,
  Wifi,
  Share,
  Shield,
  Lock,
  DeviceHub,
  CurrencyBitcoin,
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule,
  ArrowForward,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const moduleIcons = {
  OSINT: Security,
  GEOINT: Map,
  PEOPLEOSINT: Person,
  HUMINT: Psychology,
  SIGINT: Wifi,
  SOCMINT: Share,
  Darknet: Shield,
  Cryptanalysis: Lock,
  Network: DeviceHub,
  Blockchain: CurrencyBitcoin,
};

const moduleColors = {
  OSINT: '#1976d2',
  GEOINT: '#388e3c',
  PEOPLEOSINT: '#f57c00',
  HUMINT: '#7b1fa2',
  SIGINT: '#d32f2f',
  SOCMINT: '#1976d2',
  Darknet: '#424242',
  Cryptanalysis: '#f57c00',
  Network: '#388e3c',
  Blockchain: '#ff9800',
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
      // Set mock data for development
      setDashboardData({
        alerts: [
          {
            id: '1',
            title: 'Suspicious Domain Activity',
            severity: 'high',
            description: 'Unusual traffic patterns detected',
            timestamp: new Date(Date.now() - 15 * 60 * 1000)
          },
          {
            id: '2',
            title: 'New Social Media Mention',
            severity: 'medium',
            description: 'Target profile activity detected',
            timestamp: new Date(Date.now() - 45 * 60 * 1000)
          },
          {
            id: '3',
            title: 'Network Anomaly',
            severity: 'low',
            description: 'Minor traffic spike observed',
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
            target: '@username',
            status: 'in-progress',
            timestamp: new Date(Date.now() - 60 * 60 * 1000)
          }
        ],
        module_stats: Object.keys(moduleColors).map(module => ({
          module,
          success_rate: Math.random() * 0.3 + 0.7,
          total_runs: Math.floor(Math.random() * 500) + 50,
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
      case 'high': return '#d32f2f';
      case 'medium': return '#f57c00';
      case 'low': return '#388e3c';
      default: return '#666';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'in-progress': return '#ff9800';
      case 'failed': return '#f44336';
      default: return '#666';
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

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rectangular" height={120} sx={{ mb: 3, borderRadius: 2 }} />
        <Grid container spacing={3}>
          {[...Array(10)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      {/* At A Glance Panel */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            background: theme.palette.mode === 'light' 
              ? 'linear-gradient(135deg, #1976d2, #1565c0)' 
              : 'linear-gradient(135deg, #1565c0, #0d47a1)',
            color: 'white',
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="500" sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUp sx={{ mr: 2 }} />
            At A Glance
          </Typography>
          
          <Grid container spacing={3}>
            {dashboardData?.alerts?.slice(0, 3).map((alert, index) => (
              <Grid item xs={12} md={4} key={alert.id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Card
                    sx={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Warning sx={{ color: getSeverityColor(alert.severity), mr: 1 }} />
                        <Chip
                          label={alert.severity.toUpperCase()}
                          size="small"
                          sx={{
                            background: getSeverityColor(alert.severity),
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        />
                      </Box>
                      <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                        {alert.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                        {alert.description}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.6 }}>
                        {formatTimeAgo(alert.timestamp)}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="500" sx={{ display: 'flex', alignItems: 'center' }}>
            <Schedule sx={{ mr: 2 }} />
            Recent Activities
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {dashboardData?.recent_activities?.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Card
                  sx={{
                    minWidth: 200,
                    cursor: 'pointer',
                    '&:hover': { transform: 'translateY(-2px)' },
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {React.createElement(moduleIcons[activity.module] || Security, {
                        sx: { color: moduleColors[activity.module], mr: 1, fontSize: 20 }
                      })}
                      <Typography variant="subtitle2" fontWeight="500">
                        {activity.module}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {activity.target}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Chip
                        label={activity.status}
                        size="small"
                        sx={{
                          background: getStatusColor(activity.status),
                          color: 'white',
                          fontSize: '0.75rem',
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {formatTimeAgo(activity.timestamp)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Paper>
      </motion.div>

      {/* Intelligence Modules Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Typography variant="h6" gutterBottom fontWeight="500" sx={{ mb: 3 }}>
          Intelligence Disciplines
        </Typography>
        
        <Grid container spacing={3}>
          {dashboardData?.modules?.map((module, index) => {
            const IconComponent = moduleIcons[module.name] || Security;
            const moduleStats = dashboardData.module_stats?.find(stat => stat.module === module.name);
            
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={module.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.shadows[8],
                        transform: 'translateY(-2px)',
                      },
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onClick={() => navigate(`/module/${module.id}`)}
                  >
                    {/* Success Rate Ring */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: `conic-gradient(${module.color} ${(moduleStats?.success_rate || 0.8) * 360}deg, rgba(0,0,0,0.1) 0deg)`,
                        opacity: 0.3,
                      }}
                    />
                    
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          sx={{
                            background: `${module.color}20`,
                            color: module.color,
                            mr: 2,
                          }}
                        >
                          <IconComponent />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="500">
                            {module.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {moduleStats?.total_runs || 0} runs
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {module.description}
                      </Typography>
                      
                      <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Success Rate
                          </Typography>
                          <Typography variant="caption" fontWeight="500">
                            {Math.round((moduleStats?.success_rate || 0.8) * 100)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(moduleStats?.success_rate || 0.8) * 100}
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
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                        {module.tools?.slice(0, 2).map((tool) => (
                          <Chip
                            key={tool}
                            label={tool}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                        {module.tools?.length > 2 && (
                          <Chip
                            label={`+${module.tools.length - 2}`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Dashboard;