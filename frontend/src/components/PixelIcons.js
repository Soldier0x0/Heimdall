import React from 'react';

// Material Symbols wrapper component for consistent styling
export const MaterialSymbol = ({ icon, variant = 'rounded', size = 24, weight = 400, fill = 0, grade = 0, style = {}, ...props }) => {
  const className = `material-symbols-${variant}`;
  
  const iconStyle = {
    fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${size}`,
    fontSize: size,
    ...style
  };

  return (
    <span className={className} style={iconStyle} {...props}>
      {icon}
    </span>
  );
};

// Pixel-style icon components with Material Symbols
export const PixelIcons = {
  // Navigation Icons
  Dashboard: (props) => <MaterialSymbol icon="dashboard" variant="rounded" {...props} />,
  Search: (props) => <MaterialSymbol icon="search" variant="rounded" {...props} />,
  Widgets: (props) => <MaterialSymbol icon="widgets" variant="rounded" {...props} />,
  Notifications: (props) => <MaterialSymbol icon="notifications" variant="rounded" {...props} />,
  Person: (props) => <MaterialSymbol icon="person" variant="rounded" {...props} />,
  Menu: (props) => <MaterialSymbol icon="menu" variant="rounded" {...props} />,
  
  // Intelligence Module Icons
  Security: (props) => <MaterialSymbol icon="security" variant="rounded" {...props} />,
  Shield: (props) => <MaterialSymbol icon="shield" variant="rounded" {...props} />,
  Map: (props) => <MaterialSymbol icon="map" variant="rounded" {...props} />,
  LocationOn: (props) => <MaterialSymbol icon="location_on" variant="rounded" {...props} />,
  Psychology: (props) => <MaterialSymbol icon="psychology" variant="rounded" {...props} />,
  PersonSearch: (props) => <MaterialSymbol icon="person_search" variant="rounded" {...props} />,
  Wifi: (props) => <MaterialSymbol icon="wifi" variant="rounded" {...props} />,
  SignalCellularAlt: (props) => <MaterialSymbol icon="signal_cellular_alt" variant="rounded" {...props} />,
  Share: (props) => <MaterialSymbol icon="share" variant="rounded" {...props} />,
  Groups: (props) => <MaterialSymbol icon="groups" variant="rounded" {...props} />,
  VisibilityOff: (props) => <MaterialSymbol icon="visibility_off" variant="rounded" {...props} />,
  DarkWeb: (props) => <MaterialSymbol icon="admin_panel_settings" variant="rounded" {...props} />,
  Lock: (props) => <MaterialSymbol icon="lock" variant="rounded" {...props} />,
  Key: (props) => <MaterialSymbol icon="key" variant="rounded" {...props} />,
  DeviceHub: (props) => <MaterialSymbol icon="device_hub" variant="rounded" {...props} />,
  NetworkCheck: (props) => <MaterialSymbol icon="network_check" variant="rounded" {...props} />,
  CurrencyBitcoin: (props) => <MaterialSymbol icon="currency_bitcoin" variant="rounded" {...props} />,
  Payments: (props) => <MaterialSymbol icon="payments" variant="rounded" {...props} />,
  
  // Action Icons
  PlayArrow: (props) => <MaterialSymbol icon="play_arrow" variant="rounded" {...props} />,
  ArrowBack: (props) => <MaterialSymbol icon="arrow_back" variant="rounded" {...props} />,
  ArrowForward: (props) => <MaterialSymbol icon="arrow_forward" variant="rounded" {...props} />,
  Close: (props) => <MaterialSymbol icon="close" variant="rounded" {...props} />,
  Add: (props) => <MaterialSymbol icon="add" variant="rounded" {...props} />,
  Remove: (props) => <MaterialSymbol icon="remove" variant="rounded" {...props} />,
  Edit: (props) => <MaterialSymbol icon="edit" variant="rounded" {...props} />,
  Delete: (props) => <MaterialSymbol icon="delete" variant="rounded" {...props} />,
  Download: (props) => <MaterialSymbol icon="download" variant="rounded" {...props} />,
  Upload: (props) => <MaterialSymbol icon="upload" variant="rounded" {...props} />,
  Share: (props) => <MaterialSymbol icon="share" variant="rounded" {...props} />,
  
  // Status Icons
  CheckCircle: (props) => <MaterialSymbol icon="check_circle" variant="rounded" fill={1} {...props} />,
  Error: (props) => <MaterialSymbol icon="error" variant="rounded" fill={1} {...props} />,
  Warning: (props) => <MaterialSymbol icon="warning" variant="rounded" fill={1} {...props} />,
  Info: (props) => <MaterialSymbol icon="info" variant="rounded" fill={1} {...props} />,
  Schedule: (props) => <MaterialSymbol icon="schedule" variant="rounded" {...props} />,
  TrendingUp: (props) => <MaterialSymbol icon="trending_up" variant="rounded" {...props} />,
  TrendingDown: (props) => <MaterialSymbol icon="trending_down" variant="rounded" {...props} />,
  
  // Settings Icons
  Settings: (props) => <MaterialSymbol icon="settings" variant="rounded" {...props} />,
  Palette: (props) => <MaterialSymbol icon="palette" variant="rounded" {...props} />,
  DarkMode: (props) => <MaterialSymbol icon="dark_mode" variant="rounded" {...props} />,
  LightMode: (props) => <MaterialSymbol icon="light_mode" variant="rounded" {...props} />,
  Contrast: (props) => <MaterialSymbol icon="contrast" variant="rounded" {...props} />,
  
  // Biometric Icons
  Fingerprint: (props) => <MaterialSymbol icon="fingerprint" variant="rounded" {...props} />,
  Face: (props) => <MaterialSymbol icon="face" variant="rounded" {...props} />,
  FaceRetouchingNatural: (props) => <MaterialSymbol icon="face_retouching_natural" variant="rounded" {...props} />,
  
  // Filter and Sort Icons
  FilterList: (props) => <MaterialSymbol icon="filter_list" variant="rounded" {...props} />,
  Sort: (props) => <MaterialSymbol icon="sort" variant="rounded" {...props} />,
  Tune: (props) => <MaterialSymbol icon="tune" variant="rounded" {...props} />,
  
  // Tool Icons
  Build: (props) => <MaterialSymbol icon="build" variant="rounded" {...props} />,
  Code: (props) => <MaterialSymbol icon="code" variant="rounded" {...props} />,
  Terminal: (props) => <MaterialSymbol icon="terminal" variant="rounded" {...props} />,
  BugReport: (props) => <MaterialSymbol icon="bug_report" variant="rounded" {...props} />,
  
  // Data Icons
  DataUsage: (props) => <MaterialSymbol icon="data_usage" variant="rounded" {...props} />,
  Analytics: (props) => <MaterialSymbol icon="analytics" variant="rounded" {...props} />,
  BarChart: (props) => <MaterialSymbol icon="bar_chart" variant="rounded" {...props} />,
  PieChart: (props) => <MaterialSymbol icon="pie_chart" variant="rounded" {...props} />,
  
  // Communication Icons
  Email: (props) => <MaterialSymbol icon="email" variant="rounded" {...props} />,
  Phone: (props) => <MaterialSymbol icon="phone" variant="rounded" {...props} />,
  Chat: (props) => <MaterialSymbol icon="chat" variant="rounded" {...props} />,
  Forum: (props) => <MaterialSymbol icon="forum" variant="rounded" {...props} />,
  
  // File Icons
  Folder: (props) => <MaterialSymbol icon="folder" variant="rounded" {...props} />,
  InsertDriveFile: (props) => <MaterialSymbol icon="insert_drive_file" variant="rounded" {...props} />,
  PictureAsPdf: (props) => <MaterialSymbol icon="picture_as_pdf" variant="rounded" {...props} />,
  Description: (props) => <MaterialSymbol icon="description" variant="rounded" {...props} />,
};

export default PixelIcons;