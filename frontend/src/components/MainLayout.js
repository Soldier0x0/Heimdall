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
  Fade,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  Widgets as WidgetsIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Security,
  Brightness4,
  Brightness7,
  Settings,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const navigationItems = [
  { label: 'Dashboard', value: '/dashboard', icon: DashboardIcon },
  { label: 'Investigations', value: '/investigations', icon: SearchIcon },
  { label: 'Widgets', value: '/widgets', icon: WidgetsIcon },
  { label: 'Notifications', value: '/notifications', icon: NotificationsIcon },
  { label: 'Profile', value: '/profile', icon: PersonIcon },
];

const MainLayout = ({ 
  children, 
  themeMode, 
  onThemeChange, 
  primaryColor, 
  onPrimaryColorChange 
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top App Bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(30, 30, 30, 0.95)',
          backdropFilter: 'blur(10px)',
          color: theme.palette.mode === 'light' ? 'text.primary' : 'white',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Security sx={{ mr: 2, color: primaryColor }} />
            </motion.div>
            
            <Box>
              <Typography variant="h6" component="div" fontWeight="500">
                {getCurrentPageTitle()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Enterprise Intelligence Platform
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" onClick={toggleTheme}>
              {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
            
            <IconButton color="inherit">
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            background: theme.palette.background.paper,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Security sx={{ mr: 2, color: primaryColor }} />
            <Typography variant="h6" fontWeight="500">
              OSINT Nexus
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <List>
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.value;
              
              return (
                <ListItem
                  key={item.value}
                  button
                  onClick={() => {
                    navigate(item.value);
                    setDrawerOpen(false);
                  }}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    background: isActive 
                      ? `${primaryColor}20` 
                      : 'transparent',
                    '&:hover': {
                      background: `${primaryColor}10`,
                    },
                  }}
                >
                  <ListItemIcon>
                    <IconComponent 
                      sx={{ color: isActive ? primaryColor : 'inherit' }} 
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: isActive ? primaryColor : 'inherit',
                        fontWeight: isActive ? 500 : 400,
                      },
                    }}
                  />
                </ListItem>
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
          pb: isMobile ? 8 : 0, // Add padding for mobile bottom navigation
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ minHeight: '100%' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Box>
      
      {/* Bottom Navigation (Mobile) */}
      {isMobile && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            borderRadius: '24px 24px 0 0',
            background: theme.palette.mode === 'light' 
              ? 'rgba(255, 255, 255, 0.95)' 
              : 'rgba(30, 30, 30, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
          elevation={8}
        >
          <BottomNavigation
            value={location.pathname}
            onChange={handleNavigationChange}
            sx={{
              background: 'transparent',
              '& .MuiBottomNavigationAction-root': {
                minWidth: 'auto',
                '&.Mui-selected': {
                  color: primaryColor,
                },
              },
            }}
          >
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <BottomNavigationAction
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  icon={
                    item.value === '/notifications' ? (
                      <Badge badgeContent={notificationCount} color="error">
                        <IconComponent />
                      </Badge>
                    ) : (
                      <IconComponent />
                    )
                  }
                />
              );
            })}
          </BottomNavigation>
        </Paper>
      )}
      
      {/* Desktop Navigation (Hidden for now, can be implemented later) */}
      {!isMobile && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
          }}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Paper
              elevation={8}
              sx={{
                borderRadius: 6,
                overflow: 'hidden',
                background: theme.palette.mode === 'light' 
                  ? 'rgba(255, 255, 255, 0.95)' 
                  : 'rgba(30, 30, 30, 0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <BottomNavigation
                value={location.pathname}
                onChange={handleNavigationChange}
                sx={{
                  background: 'transparent',
                  minWidth: 500,
                  '& .MuiBottomNavigationAction-root': {
                    '&.Mui-selected': {
                      color: primaryColor,
                    },
                  },
                }}
              >
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <BottomNavigationAction
                      key={item.value}
                      label={item.label}
                      value={item.value}
                      icon={
                        item.value === '/notifications' ? (
                          <Badge badgeContent={notificationCount} color="error">
                            <IconComponent />
                          </Badge>
                        ) : (
                          <IconComponent />
                        )
                      }
                    />
                  );
                })}
              </BottomNavigation>
            </Paper>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default MainLayout;