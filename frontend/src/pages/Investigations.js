import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Skeleton,
  useTheme,
} from '@mui/material';
import { Search, Add, FilterList } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const Investigations = () => {
  const [investigations, setInvestigations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  useEffect(() => {
    fetchInvestigations();
  }, []);

  const fetchInvestigations = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await axios.get(`${backendUrl}/api/investigations`);
      setInvestigations(response.data.investigations || []);
    } catch (error) {
      console.error('Error fetching investigations:', error);
      // Mock data for development
      setInvestigations([
        {
          id: '1',
          module: 'OSINT',
          target: 'example.com',
          status: 'completed',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
          updated_at: new Date(Date.now() - 30 * 60 * 1000)
        },
        {
          id: '2',
          module: 'SOCMINT',
          target: '@username',
          status: 'in-progress',
          created_at: new Date(Date.now() - 45 * 60 * 1000),
          updated_at: new Date(Date.now() - 5 * 60 * 1000)
        }
      ]);
    } finally {
      setLoading(false);
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
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 3, borderRadius: 2 }} />
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="500">
            Active Investigations
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ borderRadius: 3 }}
          >
            New Investigation
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            placeholder="Search investigations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1, maxWidth: 400 }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{ borderRadius: 3 }}
          >
            Filter
          </Button>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {investigations.map((investigation, index) => (
          <Grid item xs={12} sm={6} md={4} key={investigation.id}>
            <motion.div
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
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Chip
                      label={investigation.module}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={investigation.status}
                      sx={{
                        background: getStatusColor(investigation.status),
                        color: 'white',
                      }}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="h6" gutterBottom>
                    {investigation.target}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Started {formatTimeAgo(investigation.created_at)}
                  </Typography>
                  
                  <Typography variant="caption" color="text.secondary">
                    Last updated {formatTimeAgo(investigation.updated_at)}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Investigations;