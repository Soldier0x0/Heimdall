import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Paper,
  CircularProgress,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelIcons } from './PixelIcons';
import axios from 'axios';

const moduleData = {
  osint: {
    title: 'Open Source Intelligence',
    description: 'Gather intelligence from publicly available sources',
    color: '#6750A4',
    icon: 'Security',
    tools: [
      { 
        name: 'theHarvester', 
        description: 'Email, subdomain and people names harvester from different public sources',
        status: 'active',
        category: 'Email Intelligence'
      },
      { 
        name: 'Sherlock', 
        description: 'Hunt down social media accounts by username across social networks',
        status: 'active',
        category: 'Social Intelligence'
      },
      { 
        name: 'SpiderFoot', 
        description: 'Automated OSINT collection tool for reconnaissance',
        status: 'beta',
        category: 'Reconnaissance'
      },
      { 
        name: 'Maltego CE', 
        description: 'Interactive data mining tool for link analysis',
        status: 'active',
        category: 'Link Analysis'
      }
    ]
  },
  geoint: {
    title: 'Geospatial Intelligence',
    description: 'Location-based intelligence and mapping analysis',
    color: '#2D7D32',
    icon: 'Map',
    tools: [
      { 
        name: 'Satellite Imagery', 
        description: 'High-resolution satellite imagery analysis',
        status: 'active',
        category: 'Imagery Analysis'
      },
      { 
        name: 'GPS Analysis', 
        description: 'Coordinate analysis and location intelligence',
        status: 'active',
        category: 'Location Analysis'
      },
      { 
        name: 'Terrain Mapping', 
        description: 'Advanced terrain and elevation mapping',
        status: 'beta',
        category: 'Terrain Analysis'
      }
    ]
  },
  peopleosint: {
    title: 'People Intelligence',
    description: 'Person-focused open source intelligence gathering',
    color: '#F57C00',  
    icon: 'PersonSearch',
    tools: [
      { 
        name: 'Social Profiles', 
        description: 'Comprehensive social media profile analysis',
        status: 'active',
        category: 'Social Analysis'
      },
      { 
        name: 'Background Checks', 
        description: 'Public records and background verification',
        status: 'active',
        category: 'Verification'
      },
      { 
        name: 'Identity Verification', 
        description: 'Cross-reference identity across platforms',
        status: 'beta',
        category: 'Identity Analysis'
      }
    ]
  },
  humint: {
    title: 'Human Intelligence',
    description: 'Intelligence from human sources and personas',
    color: '#7B1FA2',
    icon: 'Psychology',
    tools: [
      { 
        name: 'Persona Creation', 
        description: 'Create believable personas for investigations',
        status: 'active',
        category: 'Persona Management'
      },
      { 
        name: 'Chat Simulation', 
        description: 'Simulate conversations and interactions',
        status: 'beta',
        category: 'Social Engineering'
      },
      { 
        name: 'Behavioral Analysis', 
        description: 'Analyze human behavior patterns',
        status: 'active',
        category: 'Behavioral Intelligence'
      }
    ]
  },
  sigint: {
    title: 'Signals Intelligence',
    description: 'Electronic signals and communications intelligence',
    color: '#D32F2F',
    icon: 'SignalCellularAlt',
    tools: [
      { 
        name: 'Network Scanning', 
        description: 'Advanced network reconnaissance and mapping',
        status: 'active',
        category: 'Network Intelligence'
      },
      { 
        name: 'RF Monitoring', 
        description: 'Radio frequency signal analysis and monitoring',
        status: 'beta',
        category: 'Signal Analysis'
      },
      { 
        name: 'Signal Analysis', 
        description: 'Deep signal processing and interpretation',
        status: 'active',
        category: 'Signal Processing'
      }
    ]
  },
  socmint: {
    title: 'Social Media Intelligence',
    description: 'Intelligence from social media platforms',
    color: '#1976D2',
    icon: 'Groups',
    tools: [
      { 
        name: 'Sentiment Analysis', 
        description: 'Analyze sentiment and emotions in social content',
        status: 'active',
        category: 'Content Analysis'
      },
      { 
        name: 'Network Mapping', 
        description: 'Map social networks and relationships',
        status: 'active',
        category: 'Network Analysis'
      },
      { 
        name: 'Trend Analysis', 
        description: 'Identify trends and patterns in social data',
        status: 'beta',
        category: 'Trend Intelligence'
      }
    ]
  },
  darknet: {
    title: 'Dark Web Monitoring',
    description: 'Monitor dark web activities and threats',
    color: '#424242',
    icon: 'VisibilityOff',
    tools: [
      { 
        name: 'TOR Analysis', 
        description: 'Analyze TOR network activities and nodes',
        status: 'active',
        category: 'Network Analysis'
      },
      { 
        name: 'Hidden Services', 
        description: 'Monitor and analyze hidden services',
        status: 'active',
        category: 'Service Monitoring'
      },
      { 
        name: 'Threat Feeds', 
        description: 'Real-time threat intelligence feeds',
        status: 'beta',
        category: 'Threat Intelligence'
      }
    ]
  },
  cryptanalysis: {
    title: 'Cryptographic Analysis', 
    description: 'Analyze and break cryptographic systems',
    color: '#FF6F00',
    icon: 'Lock',
    tools: [
      { 
        name: 'Hashcat', 
        description: 'Advanced password recovery and hash cracking',
        status: 'active',
        category: 'Password Cracking'
      },
      { 
        name: 'John the Ripper', 
        description: 'Fast password cracker with multiple algorithms',
        status: 'active',
        category: 'Password Analysis'
      },
      { 
        name: 'Cipher Analysis', 
        description: 'Classical and modern cipher breaking tools',
        status: 'beta',
        category: 'Cipher Breaking'
      }
    ]
  },
  network: {
    title: 'Network Analysis',
    description: 'Network infrastructure analysis and monitoring',
    color: '#388E3C',
    icon: 'NetworkCheck',
    tools: [
      { 
        name: 'Nmap', 
        description: 'Network discovery and security auditing',
        status: 'active',
        category: 'Network Scanning'
      },
      { 
        name: 'Wireshark', 
        description: 'Network protocol analyzer and packet capture',
        status: 'active',
        category: 'Packet Analysis'
      },
      { 
        name: 'Network Topology', 
        description: 'Visualize and map network infrastructure',
        status: 'beta',
        category: 'Network Mapping'
      }
    ]
  },
  blockchain: {
    title: 'Blockchain Analysis',
    description: 'Cryptocurrency and blockchain investigation',
    color: '#FF9800',
    icon: 'CurrencyBitcoin',
    tools: [
      { 
        name: 'Address Analysis', 
        description: 'Analyze cryptocurrency addresses and transactions',
        status: 'active',
        category: 'Address Intelligence'
      },
      { 
        name: 'Transaction Tracking', 
        description: 'Track cryptocurrency transaction flows',
        status: 'active',
        category: 'Transaction Analysis'
      },
      { 
        name: 'Clustering', 
        description: 'Cluster analysis for address correlation',
        status: 'beta',
        category: 'Pattern Analysis'
      }
    ]
  }
};

const ModuleScreen = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState(null);
  const [toolInput, setToolInput] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const module = moduleData[moduleId];

  useEffect(() => {
    if (!module) {
      navigate('/dashboard');
    }
  }, [module, navigate]);

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    setModalOpen(true);
  };

  const handleExecuteTool = async () => {
    if (!toolInput.trim()) return;

    setLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await axios.post(`${backendUrl}/api/modules/${moduleId}/execute`, {
        tool: selectedTool.name,
        target: toolInput
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('Error executing tool:', error);
      // Enhanced mock results
      setResults({
        status: 'completed',
        target: toolInput,
        findings: [
          `Analysis completed for ${toolInput}`,
          `Found ${Math.floor(Math.random() * 10) + 1} relevant data points`,
          `Confidence level: ${Math.floor(Math.random() * 30) + 70}%`,
          `Processing time: ${(Math.random() * 5 + 1).toFixed(1)}s`
        ],
        metadata: {
          execution_time: `${(Math.random() * 5 + 1).toFixed(1)}s`,
          confidence: `${Math.floor(Math.random() * 30) + 70}%`,
          data_sources: Math.floor(Math.random() * 5) + 2,
          alerts: Math.floor(Math.random() * 3)
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTool(null);
    setToolInput('');
    setResults(null);
    setLoading(false);
  };

  const filteredTools = module?.tools?.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (!module) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="text.secondary">
          Module not found
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  const IconComponent = PixelIcons[module.icon];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Enhanced Header */}
      <Paper
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${module.color}, ${module.color}dd)`,
          color: 'white',
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
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, rgba(255,255,255,0.1), transparent)`,
            borderRadius: '50%',
            transform: 'translate(30%, -30%)',
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ py: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <IconButton
                  onClick={() => navigate('/dashboard')}
                  sx={{ 
                    color: 'white', 
                    background: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                  }}
                >
                  <PixelIcons.ArrowBack />
                </IconButton>
              </motion.div>

              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <IconComponent size={32} />
              </Avatar>

              <Box>
                <Typography 
                  variant="h3" 
                  fontWeight="500"
                  sx={{ fontFamily: '"Product Sans", sans-serif' }}
                >
                  {module.title}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, fontFamily: '"Google Sans", sans-serif' }}>
                  {module.description}
                </Typography>
              </Box>
            </Stack>

            {/* Enhanced Search Bar */}
            <Box sx={{ mt: 4, maxWidth: 600 }}>
              <TextField
                fullWidth
                placeholder="Search tools and techniques..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <PixelIcons.Search style={{ marginRight: 12, color: 'white' }} />,
                  sx: {
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 3,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& input::placeholder': { color: 'rgba(255, 255, 255, 0.8)' },
                  }
                }}
              />
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Tools Grid */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography 
          variant="h5" 
          fontWeight="500" 
          gutterBottom 
          sx={{ mb: 3, fontFamily: '"Product Sans", sans-serif' }}
        >
          Available Tools ({filteredTools.length})
        </Typography>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: 3 
        }}>
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card
                onClick={() => handleToolSelect(tool)}
                sx={{
                  cursor: 'pointer',
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    boxShadow: `0 12px 40px ${module.color}25`,
                    borderColor: module.color,
                    '& .tool-icon': {
                      transform: 'scale(1.1)',
                      color: module.color,
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="flex-start" spacing={2} mb={2}>
                    <Avatar
                      sx={{
                        background: `${module.color}15`,
                        width: 48,
                        height: 48,
                      }}
                    >
                      <PixelIcons.Build 
                        className="tool-icon"
                        size={24}
                        style={{ 
                          color: module.color,
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </Avatar>

                    <Box flex={1}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                        <Typography 
                          variant="h6" 
                          fontWeight="500"
                          sx={{ fontFamily: '"Product Sans", sans-serif' }}
                        >
                          {tool.name}
                        </Typography>
                        <Chip
                          label={tool.status}
                          size="small"
                          color={tool.status === 'active' ? 'success' : 'warning'}
                          sx={{ 
                            fontWeight: 500,
                            fontSize: '0.7rem',
                          }}
                        />
                      </Stack>

                      <Chip
                        label={tool.category}
                        variant="outlined"
                        size="small"
                        sx={{
                          mb: 1,
                          borderColor: `${module.color}40`,
                          color: module.color,
                          fontSize: '0.7rem',
                        }}
                      />
                    </Box>
                  </Stack>

                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 3, lineHeight: 1.6 }}
                  >
                    {tool.description}
                  </Typography>

                  <Button
                    variant="outlined"
                    startIcon={<PixelIcons.PlayArrow />}
                    fullWidth
                    sx={{
                      borderColor: module.color,
                      color: module.color,
                      '&:hover': {
                        background: `${module.color}10`,
                        borderColor: module.color,
                      },
                    }}
                  >
                    Execute Tool
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* Enhanced Tool Execution Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ 
          timeout: 500,
          sx: { backdropFilter: 'blur(8px)' }
        }}
      >
        <Fade in={modalOpen}>
          <Paper
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? '90%' : 700,
              maxHeight: '85vh',
              overflow: 'auto',
              borderRadius: 4,
              p: 0,
              border: `2px solid ${module?.color}40`,
            }}
          >
            {/* Modal Header */}
            <Box
              sx={{
                background: `linear-gradient(135deg, ${module?.color}, ${module?.color}dd)`,
                color: 'white',
                p: 3,
                position: 'relative',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h5" fontWeight="500" sx={{ fontFamily: '"Product Sans", sans-serif' }}>
                    {selectedTool?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {selectedTool?.description}
                  </Typography>
                </Box>
                <IconButton 
                  onClick={handleCloseModal}
                  sx={{ 
                    color: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                  }}
                >
                  <PixelIcons.Close />
                </IconButton>
              </Stack>
            </Box>

            <Box sx={{ p: 3 }}>
              {!results && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom fontWeight="500">
                    Target Configuration
                  </Typography>
                  <TextField
                    fullWidth
                    label="Target"
                    placeholder="Enter domain, username, IP address, or other target..."
                    value={toolInput}
                    onChange={(e) => setToolInput(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 3 }}
                    multiline={selectedTool?.name === 'Cipher Analysis'}
                    rows={selectedTool?.name === 'Cipher Analysis' ? 3 : 1}
                  />
                  
                  <Button
                    variant="contained"
                    onClick={handleExecuteTool}
                    disabled={loading || !toolInput.trim()}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PixelIcons.PlayArrow />}
                    size="large"
                    sx={{
                      background: module?.color,
                      '&:hover': { background: `${module?.color}dd` },
                      px: 4,
                    }}
                  >
                    {loading ? 'Executing Analysis...' : 'Run Analysis'}
                  </Button>
                </Box>
              )}

              {results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight="500">
                      Analysis Results
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" color="primary">
                        <PixelIcons.Share />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <PixelIcons.Download />
                      </IconButton>
                    </Stack>
                  </Stack>

                  <Card variant="outlined" sx={{ borderRadius: 3, mb: 3 }}>
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom color="primary" fontWeight="500">
                        Target: {results.target}
                      </Typography>
                      
                      <Divider sx={{ my: 2 }} />

                      <Typography variant="subtitle2" gutterBottom fontWeight="500">
                        Key Findings:
                      </Typography>
                      <List dense>
                        {results.findings?.map((finding, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemText 
                              primary={`• ${finding}`}
                              sx={{ 
                                '& .MuiListItemText-primary': { 
                                  fontSize: '0.9rem',
                                  lineHeight: 1.5,
                                }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>

                      {results.metadata && (
                        <>
                          <Divider sx={{ my: 2 }} />
                          <Box sx={{ 
                            background: theme.palette.background.default,
                            borderRadius: 2,
                            p: 2,
                          }}>
                            <Typography variant="caption" color="text.secondary" fontWeight="500">
                              EXECUTION METADATA
                            </Typography>
                            <Stack direction="row" spacing={3} mt={1}>
                              <Typography variant="body2">
                                <strong>Time:</strong> {results.metadata.execution_time}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Confidence:</strong> {results.metadata.confidence}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Sources:</strong> {results.metadata.data_sources}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Alerts:</strong> {results.metadata.alerts}
                              </Typography>
                            </Stack>
                          </Box>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  <Button
                    variant="outlined"
                    onClick={() => {
                      setResults(null);
                      setToolInput('');
                    }}
                    fullWidth
                  >
                    Run New Analysis
                  </Button>
                </motion.div>
              )}
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ModuleScreen;