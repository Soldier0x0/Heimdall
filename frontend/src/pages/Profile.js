import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Skeleton,
} from '@mui/material';
import {
  Person,
  Security,
  Palette,
  Notifications,
  Info,
  Settings,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await axios.get(`${backendUrl}/api/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Mock data for development
      setProfile({
        id: '1',
        username: 'analyst_001',
        email: 'analyst@osintnexus.com',
        avatar: 'https://i.pravatar.cc/150?img=1',
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        investigations_count: 47,
        success_rate: 0.92
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rectangular" height={200} sx={{ mb: 3, borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Card */}
        <Card sx={{ borderRadius: 3, mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                src={profile.avatar}
                sx={{ width: 80, height: 80, mr: 3 }}
              />
              <Box>
                <Typography variant="h5" fontWeight="500" gutterBottom>
                  {profile.username}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {profile.email}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Member since {new Date(profile.created_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="500" color="primary">
                  {profile.investigations_count}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Investigations
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="500" color="success.main">
                  {Math.round(profile.success_rate * 100)}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Success Rate
                </Typography>
              </Box>
            </Box>

            <Button variant="outlined" sx={{ borderRadius: 3 }}>
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="500" gutterBottom>
              Settings
            </Typography>

            <List>
              <ListItem>
                <ListItemIcon>
                  <Palette />
                </ListItemIcon>
                <ListItemText
                  primary="Theme"
                  secondary="Customize appearance and colors"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Dark Mode"
                />
              </ListItem>

              <Divider />

              <ListItem>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText
                  primary="Notifications"
                  secondary="Manage alert preferences"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enabled"
                />
              </ListItem>

              <Divider />

              <ListItem>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText
                  primary="Privacy"
                  secondary="Data retention and privacy settings"
                />
                <Button size="small" variant="outlined">
                  Configure
                </Button>
              </ListItem>

              <Divider />

              <ListItem>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText
                  primary="About"
                  secondary="Version 1.0.0 - Enterprise Intelligence Platform"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Profile;