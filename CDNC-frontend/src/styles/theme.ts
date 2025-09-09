export const theme = {
  colors: {
    primary: {
      main: '#1a365d', // Deep navy blue
      light: '#e6f0ff',
      dark: '#0f2942',
      contrast: '#ffffff',
    },
    secondary: {
      main: '#4a90e2', // Bright blue
      light: '#e8f4ff',
      dark: '#357abd',
      contrast: '#ffffff',
    },
    accent: {
      main: '#f6ad55', // Warm orange
      light: '#fff5e6',
      dark: '#e69a3c',
      contrast: '#1a365d',
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
      dark: '#1a365d',
    },
    text: {
      primary: '#1a365d',
      secondary: '#4a5568',
      light: '#718096',
    },
    success: {
      main: '#48bb78',
      light: '#c6f6d5',
      dark: '#38a169',
    },
    error: {
      main: '#f56565',
      light: '#fed7d7',
      dark: '#e53e3e',
    },
    warning: {
      main: '#ed8936',
      light: '#fefcbf',
      dark: '#dd6b20',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  transitions: {
    default: 'all 0.3s ease-in-out',
    fast: 'all 0.15s ease-in-out',
    slow: 'all 0.5s ease-in-out',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      serif: 'Georgia, serif',
      mono: 'Menlo, Monaco, Consolas, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  animations: {
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    fadeIn: 'fadeIn 0.5s ease-in-out',
    slideUp: 'slideUp 0.5s ease-out',
  },
  keyframes: {
    pulse: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 },
    },
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    slideUp: {
      '0%': { transform: 'translateY(20px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
  },
}; 