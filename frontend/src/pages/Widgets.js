import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { motion } from 'framer-motion';

const Widgets = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight="500" gutterBottom>
          Widgets & At A Glance
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Configure your home screen widgets and quick access panels
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Threat Summary Widget
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Display real-time threat alerts on your home screen
                </Typography>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable widget"
                />
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Investigation Status
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Quick view of active investigations
                </Typography>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable widget"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Widgets;