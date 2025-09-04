import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Avatar,
  Chip,
  Stack,
  Fade,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelIcons } from './PixelIcons';

const navigationItems = [
  { label: 'Dashboard', value: '/dashboard', icon: 'Dashboard' },
  { label: 'Investigations', value: '/investigations', icon: 'Search' },
  { label: 'Widgets', value: '/widgets', icon: 'Widgets' },
  { label: 'Notifications', value: '/notifications', icon: 'Notifications' },
  { label: 'Profile', value: '/profile', icon: 'Person' },
];

const MainLayout = ({ 
  children, 
  themeMode, 
  onThemeChange, 
  colorScheme, 
  onColorSchemeChange 
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/module/')) {
      const moduleId = currentPath.split('/')[2];
      return `${moduleId.toUpperCase()} Module`;
    }
    const currentItem = navigationItems.find(item => item.value === currentPath);
    return currentItem ? currentItem.label : 'OSINT Nexus';
  };
  
  const handleNavigationChange = (event, newValue) => {
    navigate(newValue);
  };
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const toggleTheme = () => {
    onThemeChange(themeMode === 'light' ? 'dark' : 'light');
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      background: theme.palette.background.default,
    }}>
      {/* Pixel-style Top App Bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(28, 27, 31, 0.95)',
          backdropFilter: 'blur(20px)',
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ px: isMobile ? 2 : 4 }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ 
                mr: 2,
                background: 'rgba(103, 80, 164, 0.1)',
                '&:hover': {
                  background: 'rgba(103, 80, 164, 0.2)',
                },
              }}
            >
              <PixelIcons.Menu />
            </IconButton>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Avatar
                sx={{
                  background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.primary}cc)`,
                  mr: 2,
                  width: 40,
                  height: 40,
                }}
              >
                <PixelIcons.Shield size={24} />
              </Avatar>
            </motion.div>
            
            <Box>
              <Typography variant="h6" component="div" fontWeight="500" sx={{ fontFamily: '"Product Sans", sans-serif' }}>
                {getCurrentPageTitle()}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: '"Google Sans", sans-serif' }}>
                Enterprise Intelligence Platform
              </Typography>
            </Box>
          </Box>
          
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton 
                color="inherit" 
                onClick={toggleTheme}
                sx={{
                  background: 'rgba(103, 80, 164, 0.1)',
                  '&:hover': {
                    background: 'rgba(103, 80, 164, 0.2)',
                  },
                }}
              >
                {themeMode === 'light' ? <PixelIcons.DarkMode /> : <PixelIcons.LightMode />}
              </IconButton>
            </motion.div>
            
            {/* Notifications */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton 
                color="inherit"
                sx={{
                  background: 'rgba(103, 80, 164, 0.1)',
                  '&:hover': {
                    background: 'rgba(103, 80, 164, 0.2)',
                  },
                }}
              >
                <Badge 
                  badgeContent={notificationCount} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.75rem',
                      fontFamily: '"Google Sans", sans-serif',
                    }
                  }}
                >
                  <PixelIcons.Notifications />
                </Badge>
              </IconButton>
            </motion.div>
          </Stack>
        </Toolbar>
      </AppBar>
      
      {/* Enhanced Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 320,
            background: theme.palette.background.paper,
            borderRadius: '0 28px 28px 0',
            border: `1px solid ${theme.palette.divider}`,
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.primary}cc)`,
                mr: 2,
                width: 48,
                height: 48,
              }}
            >
              <PixelIcons.Shield size={28} />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="500" sx={{ fontFamily: '"Product Sans", sans-serif' }}>
                OSINT Nexus
              </Typography>
              <Chip 
                label={colorScheme.name} 
                size="small" 
                variant="outlined" 
                sx={{ fontSize: '0.7rem' }}
              />
            </Box>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          {/* Navigation Items */}
          <List>
            {navigationItems.map((item, index) => {
              const IconComponent = PixelIcons[item.icon];
              const isActive = location.pathname === item.value;
              
              return (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <ListItem
                    button
                    onClick={() => {
                      navigate(item.value);
                      setDrawerOpen(false);
                    }}
                    sx={{
                      borderRadius: 3,
                      mb: 1,
                      background: isActive 
                        ? `${colorScheme.primary}20` 
                        : 'transparent',
                      '&:hover': {
                        background: `${colorScheme.primary}15`,
                        transform: 'translateX(4px)',
                      },
                      transition: 'all 0.3s ease',
                      py: 1.5,
                    }}
                  >
                    <ListItemIcon>
                      <IconComponent 
                        size={24}
                        style={{ color: isActive ? colorScheme.primary : theme.palette.text.secondary }} 
                      />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: isActive ? colorScheme.primary : theme.palette.text.primary,
                          fontWeight: isActive ? 500 : 400,
                          fontFamily: '"Google Sans", sans-serif',
                        },
                      }}
                    />
                    {item.value === '/notifications' && notificationCount > 0 && (
                      <Badge badgeContent={notificationCount} color="error" />
                    )}
                  </ListItem>
                </motion.div>
              );
            })}
          </List>
        </Box>
      </Drawer>
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          overflow: 'auto',
          background: theme.palette.background.default,
          pb: isMobile ? 10 : 2, // Add padding for mobile bottom navigation
          position: 'relative',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ minHeight: '100%' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Box>
      
      {/* Pixel-style Bottom Navigation (Mobile) */}
      {isMobile && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Paper
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              borderRadius: '28px 28px 0 0',
              background: theme.palette.mode === 'light' 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(28, 27, 31, 0.95)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: '0px -2px 12px rgba(0, 0, 0, 0.15)',
            }}
            elevation={0}
          >
            <BottomNavigation
              value={location.pathname}
              onChange={handleNavigationChange}
              sx={{
                background: 'transparent',
                height: 72,
                '& .MuiBottomNavigationAction-root': {
                  borderRadius: 2,
                  mx: 0.5,
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    color: colorScheme.primary,
                    background: `${colorScheme.primary}15`,
                    '& .MuiBottomNavigationAction-icon': {
                      transform: 'scale(1.1)',
                    },
                  },
                  '& .MuiBottomNavigationAction-label': {
                    fontFamily: '"Google Sans", sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  },
                },
              }}
            >
              {navigationItems.map((item) => {
                const IconComponent = PixelIcons[item.icon];
                return (
                  <BottomNavigationAction
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    icon={
                      item.value === '/notifications' ? (
                        <Badge badgeContent={notificationCount} color="error">
                          <IconComponent size={24} />
                        </Badge>
                      ) : (
                        <IconComponent size={24} />
                      )
                    }
                  />
                );
              })}
            </BottomNavigation>
          </Paper>
        </motion.div>
      )}
      
      {/* Desktop Floating Navigation */}
      {!isMobile && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        >
          <Box
            sx={{
              position: 'fixed',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
            }}
          >
            <Paper
              elevation={8}
              sx={{
                borderRadius: 6,
                overflow: 'hidden',
                background: theme.palette.mode === 'light' 
                  ? 'rgba(255, 255, 255, 0.95)' 
                  : 'rgba(28, 27, 31, 0.95)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.15)',
              }}
            >
              <BottomNavigation
                value={location.pathname}
                onChange={handleNavigationChange}
                sx={{
                  background: 'transparent',
                  minWidth: 500,
                  height: 64,
                  '& .MuiBottomNavigationAction-root': {
                    borderRadius: 2,
                    mx: 1,
                    transition: 'all 0.3s ease',
                    '&.Mui-selected': {
                      color: colorScheme.primary,
                      background: `${colorScheme.primary}15`,
                      transform: 'translateY(-2px)',
                    },
                    '& .MuiBottomNavigationAction-label': {
                      fontFamily: '"Google Sans", sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    },
                  },
                }}
              >
                {navigationItems.map((item) => {
                  const IconComponent = PixelIcons[item.icon];
                  return (
                    <BottomNavigationAction
                      key={item.value}
                      label={item.label}
                      value={item.value}
                      icon={
                        item.value === '/notifications' ? (
                          <Badge badgeContent={notificationCount} color="error">
                            <IconComponent size={28} />
                          </Badge>
                        ) : (
                          <IconComponent size={28} />
                        )
                      }
                    />
                  );
                })}
              </BottomNavigation>
            </Paper>
          </Box>
        </motion.div>
      )}
    </Box>
  );
};

export default MainLayout;