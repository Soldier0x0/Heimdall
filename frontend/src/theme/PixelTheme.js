import { createTheme } from '@mui/material/styles';

// Material You Color Tokens (Pixel-style)
const materialYouColors = {
  // Primary colors (Dynamic)
  primary: {
    0: '#000000',
    10: '#21005D',
    20: '#381E72',
    30: '#4F378B',
    40: '#6750A4',
    50: '#7F67BE',
    60: '#9A82DB',
    70: '#B69DF8',
    80: '#D0BCFF',
    90: '#EADDFF',
    95: '#F6EDFF',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },
  // Secondary colors
  secondary: {
    0: '#000000',
    10: '#1D192B',
    20: '#332D41',
    30: '#4A4458',
    40: '#625B71',
    50: '#7A7289',
    60: '#958DA5',
    70: '#B0A7C0',
    80: '#CCC2DC',
    90: '#E8DEF8',
    95: '#F6EDFF',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },
  // Tertiary colors
  tertiary: {
    0: '#000000',
    10: '#31111D',
    20: '#492532',
    30: '#633B48',
    40: '#7D5260',
    50: '#986977',
    60: '#B58392',
    70: '#D29DAC',
    80: '#EFB8C8',
    90: '#FFD8E4',
    95: '#FFECF1',
    99: '#FFFBFA',
    100: '#FFFFFF',
  },
  // Neutral colors
  neutral: {
    0: '#000000',
    10: '#1C1B1F',
    20: '#313033',
    30: '#484649',
    40: '#605D62',
    50: '#787579',
    60: '#939094',
    70: '#AEAAAE',
    80: '#CAC4D0',
    90: '#E6E0E9',
    95: '#F4EFF4',
    99: '#FFFBFE',
    100: '#FFFFFF',
  },
  // Error colors
  error: {
    0: '#000000',
    10: '#410E0B',
    20: '#601410',
    30: '#8C1D18',
    40: '#B3261E',
    50: '#DC362E',
    60: '#E46962',
    70: '#EC928E',
    80: '#F2B8B5',
    90: '#F9DEDC',
    95: '#FCEEEE',
    99: '#FFFBF9',
    100: '#FFFFFF',
  }
};

// Create Pixel-style theme
export const createPixelTheme = (mode = 'light', accentColor = 'primary') => {
  const isDark = mode === 'dark';
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: materialYouColors.primary[40],
        light: materialYouColors.primary[80],
        dark: materialYouColors.primary[20],
        contrastText: materialYouColors.neutral[99],
      },
      secondary: {
        main: materialYouColors.secondary[40],
        light: materialYouColors.secondary[80],
        dark: materialYouColors.secondary[20],
        contrastText: materialYouColors.neutral[99],
      },
      tertiary: {
        main: materialYouColors.tertiary[40],
        light: materialYouColors.tertiary[80],
        dark: materialYouColors.tertiary[20],
        contrastText: materialYouColors.neutral[99],
      },
      error: {
        main: materialYouColors.error[40],
        light: materialYouColors.error[80],
        dark: materialYouColors.error[20],
        contrastText: materialYouColors.neutral[99],
      },
      warning: {
        main: '#F9AB00',
        light: '#FDE293',
        dark: '#E37400',
        contrastText: materialYouColors.neutral[10],
      },
      info: {
        main: materialYouColors.primary[60],
        light: materialYouColors.primary[90],
        dark: materialYouColors.primary[30],
        contrastText: materialYouColors.neutral[99],
      },
      success: {
        main: '#146C2E',
        light: '#C4E7C7',
        dark: '#0D5016',
        contrastText: materialYouColors.neutral[99],
      },
      background: {
        default: isDark ? materialYouColors.neutral[10] : materialYouColors.neutral[99],
        paper: isDark ? materialYouColors.neutral[20] : materialYouColors.neutral[100],
        surface: isDark ? materialYouColors.neutral[20] : materialYouColors.neutral[95],
        surfaceVariant: isDark ? materialYouColors.neutral[30] : materialYouColors.neutral[90],
      },
      text: {
        primary: isDark ? materialYouColors.neutral[90] : materialYouColors.neutral[10],
        secondary: isDark ? materialYouColors.neutral[80] : materialYouColors.neutral[30],
        disabled: isDark ? materialYouColors.neutral[60] : materialYouColors.neutral[50],
      },
      divider: isDark ? materialYouColors.neutral[60] : materialYouColors.neutral[80],
      outline: isDark ? materialYouColors.neutral[60] : materialYouColors.neutral[50],
      outlineVariant: isDark ? materialYouColors.neutral[50] : materialYouColors.neutral[80],
    },
    typography: {
      fontFamily: '"Product Sans", "Google Sans", "Roboto", "Helvetica", "Arial", sans-serif',
      // Pixel-style typography scale
      h1: {
        fontFamily: '"Product Sans", "Google Sans", sans-serif',
        fontSize: '3.5rem',
        fontWeight: 400,
        lineHeight: 1.167,
        letterSpacing: '-0.01562em',
      },
      h2: {
        fontFamily: '"Product Sans", "Google Sans", sans-serif',
        fontSize: '2.75rem',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '-0.00833em',
      },
      h3: {
        fontFamily: '"Product Sans", "Google Sans", sans-serif',
        fontSize: '2.25rem',
        fontWeight: 500,
        lineHeight: 1.167,
        letterSpacing: '0em',
      },
      h4: {
        fontFamily: '"Product Sans", "Google Sans", sans-serif',
        fontSize: '1.75rem',
        fontWeight: 500,
        lineHeight: 1.235,
        letterSpacing: '0.00735em',
      },
      h5: {
        fontFamily: '"Product Sans", "Google Sans", sans-serif',
        fontSize: '1.5rem',
        fontWeight: 500,
        lineHeight: 1.334,
        letterSpacing: '0em',
      },
      h6: {
        fontFamily: '"Product Sans", "Google Sans", sans-serif',
        fontSize: '1.25rem',
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: '0.0075em',
      },
      subtitle1: {
        fontFamily: '"Google Sans", sans-serif',
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
      },
      subtitle2: {
        fontFamily: '"Google Sans", sans-serif',
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: '0.00714em',
      },
      body1: {
        fontFamily: '"Google Sans", sans-serif',
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.03125em',
      },
      body2: {
        fontFamily: '"Google Sans", sans-serif',
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.01786em',
      },
      button: {
        fontFamily: '"Google Sans", sans-serif',
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: '0.08929em',
        textTransform: 'none',
      },
      caption: {
        fontFamily: '"Google Sans", sans-serif',
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
      },
      overline: {
        fontFamily: '"Google Sans", sans-serif',
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 2.66,
        letterSpacing: '0.08333em',
        textTransform: 'uppercase',
      },
    },
    shape: {
      borderRadius: 16, // Pixel-style rounded corners
    },
    spacing: 4, // Base spacing unit
    shadows: [
      'none',
      // Pixel-style elevation shadows
      '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
      '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
      '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',
      '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)',
      '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',
      '0px 10px 14px 8px rgba(0, 0, 0, 0.15), 0px 5px 5px rgba(0, 0, 0, 0.3)',
      '0px 12px 16px 10px rgba(0, 0, 0, 0.15), 0px 6px 6px rgba(0, 0, 0, 0.3)',
      '0px 14px 18px 12px rgba(0, 0, 0, 0.15), 0px 7px 7px rgba(0, 0, 0, 0.3)',
      // Continue the pattern...
      ...Array(15).fill('0px 16px 20px 14px rgba(0, 0, 0, 0.15), 0px 8px 8px rgba(0, 0, 0, 0.3)')
    ],
    components: {
      // Material You component styles
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundColor: isDark ? materialYouColors.neutral[20] : materialYouColors.neutral[95],
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
            border: `1px solid ${isDark ? materialYouColors.neutral[40] : materialYouColors.neutral[80]}`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            padding: '10px 24px',
            minHeight: 40,
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
            },
          },
          contained: {
            backgroundColor: materialYouColors.primary[40],
            color: materialYouColors.neutral[99],
            '&:hover': {
              backgroundColor: materialYouColors.primary[30],
            },
          },
          outlined: {
            borderColor: materialYouColors.primary[40],
            color: materialYouColors.primary[40],
            '&:hover': {
              backgroundColor: `${materialYouColors.primary[40]}14`,
            },
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontFamily: '"Google Sans", sans-serif',
            fontWeight: 500,
          },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            borderRadius: '28px 28px 0 0',
            backgroundColor: isDark ? materialYouColors.neutral[20] : materialYouColors.neutral[95],
            backdropFilter: 'blur(20px)',
            borderTop: `1px solid ${isDark ? materialYouColors.neutral[40] : materialYouColors.neutral[80]}`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(20px)',
            boxShadow: 'none',
            borderBottom: `1px solid ${isDark ? materialYouColors.neutral[40] : materialYouColors.neutral[80]}`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              backgroundColor: isDark ? materialYouColors.neutral[30] : materialYouColors.neutral[90],
              '& fieldset': {
                borderColor: isDark ? materialYouColors.neutral[50] : materialYouColors.neutral[70],
              },
              '&:hover fieldset': {
                borderColor: materialYouColors.primary[40],
              },
              '&.Mui-focused fieldset': {
                borderColor: materialYouColors.primary[40],
                borderWidth: 2,
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? materialYouColors.neutral[20] : materialYouColors.neutral[95],
            backgroundImage: 'none',
          },
          elevation1: {
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 500,
        enteringScreen: 300,
        leavingScreen: 250,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        // Pixel-style easing
        emphasized: 'cubic-bezier(0.2, 0.0, 0, 1.0)',
        standard: 'cubic-bezier(0.2, 0.0, 0, 1.0)',
      },
    },
  });
};

export default createPixelTheme;