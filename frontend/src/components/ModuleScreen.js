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
} from '@mui/material';
import {
  ArrowBack,
  Search,
  FilterList,
  PlayArrow,
  Share,
  Download,
  Close,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ModuleScreen = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [toolInput, setToolInput] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchModuleData();
  }, [moduleId]);

  const fetchModuleData = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await axios.get(`${backendUrl}/api/modules`);
      const foundModule = response.data.modules.find(m => m.id === moduleId);
      if (foundModule) {
        setModule(foundModule);
      }
    } catch (error) {
      console.error('Error fetching module data:', error);
      // Mock data for development
      setModule({
        id: moduleId,
        name: moduleId.toUpperCase(),
        title: getModuleTitle(moduleId),
        description: getModuleDescription(moduleId),
        tools: getModuleTools(moduleId),
        color: getModuleColor(moduleId)
      });
    }
  };

  const getModuleTitle = (id) => {
    const titles = {
      osint: 'Open Source Intelligence',
      geoint: 'Geospatial Intelligence',
      peopleosint: 'People Intelligence',
      humint: 'Human Intelligence',
      sigint: 'Signals Intelligence',
      socmint: 'Social Media Intelligence',
      darknet: 'Dark Web Monitoring',
      cryptanalysis: 'Cryptographic Analysis',
      network: 'Network Analysis',
      blockchain: 'Blockchain Analysis'
    };
    return titles[id] || id.toUpperCase();
  };

  const getModuleDescription = (id) => {
    const descriptions = {
      osint: 'Gather intelligence from publicly available sources',
      geoint: 'Location-based intelligence and mapping analysis',
      peopleosint: 'Person-focused open source intelligence',
      humint: 'Intelligence from human sources and personas',
      sigint: 'Electronic signals and communications intelligence',
      socmint: 'Intelligence from social media platforms',
      darknet: 'Monitor dark web activities and threats',
      cryptanalysis: 'Analyze and break cryptographic systems',
      network: 'Network infrastructure analysis and monitoring',
      blockchain: 'Cryptocurrency and blockchain investigation'
    };
    return descriptions[id] || 'Intelligence analysis and investigation';
  };

  const getModuleTools = (id) => {
    const tools = {
      osint: [
        { name: 'theHarvester', description: 'Email, subdomain and people names harvester', status: 'active' },
        { name: 'Sherlock', description: 'Hunt down social media accounts', status: 'active' },
        { name: 'SpiderFoot', description: 'Automated OSINT collection', status: 'beta' },
        { name: 'Maltego CE', description: 'Link analysis and data mining', status: 'active' }
      ],
      geoint: [
        { name: 'Satellite Imagery', description: 'High-resolution satellite analysis', status: 'active' },
        { name: 'GPS Analysis', description: 'Coordinate and location intelligence', status: 'active' },
        { name: 'Location Mapping', description: 'Advanced geospatial mapping', status: 'beta' }
      ],
      // Add more tools for other modules as needed
      default: [
        { name: 'Analysis Tool 1', description: 'Primary analysis capabilities', status: 'active' },
        { name: 'Analysis Tool 2', description: 'Secondary analysis features', status: 'beta' }
      ]
    };
    return tools[id] || tools.default;
  };

  const getModuleColor = (id) => {
    const colors = {
      osint: '#1976d2',
      geoint: '#388e3c',
      peopleosint: '#f57c00',
      humint: '#7b1fa2',
      sigint: '#d32f2f',
      socmint: '#1976d2',
      darknet: '#424242',
      cryptanalysis: '#f57c00',
      network: '#388e3c',
      blockchain: '#ff9800'
    };
    return colors[id] || '#1976d2';
  };

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
      // Mock results for development
      setResults({
        status: 'completed',
        data: {
          target: toolInput,
          findings: ['Sample finding 1', 'Sample finding 2', 'Sample finding 3'],
          metadata: {
            execution_time: '2.3s',
            confidence: '85%'
          }
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

  if (!module) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: `linear-gradient(135deg, ${module.color}10, transparent)` }}>
      {/* Header */}
      <Paper
        elevation={1}
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${module.color}, ${module.color}dd)`,
          color: 'white',
          borderRadius: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton
            onClick={() => navigate('/dashboard')}
            sx={{ color: 'white', mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant="h4" fontWeight="500">
              {module.title}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {module.description}
            </Typography>
          </Box>
        </Box>

        {/* Search and Filter Bar */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <TextField
            placeholder="Search tools and techniques..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'white' }} />,
              sx: {
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 3,
                '& .MuiOutlinedInput-input': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' },
              }
            }}
            sx={{ flex: 1, maxWidth: 400 }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '&:hover': { borderColor: 'white' }
            }}
          >
            Filter
          </Button>
        </Box>
      </Paper>

      {/* Tools Grid */}
      <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Available Tools
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
          {module.tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card
                sx={{
                  cursor: 'pointer',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: theme.shadows[8],
                    transform: 'translateY(-2px)',
                  },
                }}
                onClick={() => handleToolSelect(tool)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight="500">
                      {tool.name}
                    </Typography>
                    <Chip
                      label={tool.status}
                      size="small"
                      color={tool.status === 'active' ? 'success' : 'warning'}
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {tool.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PlayArrow />}
                    sx={{ mt: 2 }}
                  >
                    Execute
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Tool Execution Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={modalOpen}>
          <Paper
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? '90%' : 600,
              maxHeight: '80vh',
              overflow: 'auto',
              borderRadius: 3,
              p: 4,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight="500">
                {selectedTool?.name}
              </Typography>
              <IconButton onClick={handleCloseModal}>
                <Close />
              </IconButton>
            </Box>

            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
              {selectedTool?.description}
            </Typography>

            {!results && (
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Target"
                  placeholder="Enter domain, username, IP address..."
                  value={toolInput}
                  onChange={(e) => setToolInput(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleExecuteTool}
                  disabled={loading || !toolInput.trim()}
                  startIcon={loading ? <CircularProgress size={20} /> : <PlayArrow />}
                  sx={{ borderRadius: 3 }}
                >
                  {loading ? 'Executing...' : 'Run Analysis'}
                </Button>
              </Box>
            )}

            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Results</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small">
                        <Share />
                      </IconButton>
                      <IconButton size="small">
                        <Download />
                      </IconButton>
                    </Box>
                  </Box>

                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom color="primary">
                        Target: {results.data?.target}
                      </Typography>
                      
                      {results.data?.findings && (
                        <List dense>
                          {results.data.findings.map((finding, index) => (
                            <ListItem key={index}>
                              <ListItemText primary={finding} />
                            </ListItem>
                          ))}
                        </List>
                      )}

                      {results.data?.metadata && (
                        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                          <Typography variant="caption" color="text.secondary">
                            Execution Time: {results.data.metadata.execution_time} | 
                            Confidence: {results.data.metadata.confidence}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              </motion.div>
            )}
          </Paper>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ModuleScreen;