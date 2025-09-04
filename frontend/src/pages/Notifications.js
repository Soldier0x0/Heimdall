import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  IconButton,
  Chip,
  Skeleton,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Warning,
  Info,
  CheckCircle,
  Delete,
  MarkAsUnread,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await axios.get(`${backendUrl}/api/notifications`);
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Mock data for development
      setNotifications([
        {
          id: '1',
          title: 'Investigation Complete',
          message: 'Your OSINT investigation on example.com has finished',
          type: 'success',
          read: false,
          timestamp: new Date(Date.now() - 15 * 60 * 1000)
        },
        {
          id: '2',
          title: 'New Threat Alert',
          message: 'Suspicious activity detected in dark web monitoring',
          type: 'warning',
          read: false,
          timestamp: new Date(Date.now() - 60 * 60 * 1000)
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle color="success" />;
      case 'warning': return <Warning color="warning" />;
      case 'error': return <Warning color="error" />;
      default: return <Info color="info" />;
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
        <Skeleton variant="text" height={60} sx={{ mb: 3 }} />
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} variant="rectangular" height={80} sx={{ mb: 2, borderRadius: 2 }} />
        ))}
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
        <Typography variant="h4" fontWeight="500" gutterBottom>
          Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Stay updated with real-time alerts and system notifications
        </Typography>

        <Card sx={{ borderRadius: 3 }}>
          <List>
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <ListItem
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    background: !notification.read ? 'rgba(25, 118, 210, 0.05)' : 'transparent',
                  }}
                >
                  <ListItemIcon>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {notification.title}
                        {!notification.read && (
                          <Badge variant="dot" color="primary" />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatTimeAgo(notification.timestamp)}
                        </Typography>
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small">
                      <MarkAsUnread />
                    </IconButton>
                    <IconButton size="small">
                      <Delete />
                    </IconButton>
                  </Box>
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Notifications;