import { GlobalStyles, ThemeProvider, createTheme } from '@mui/material';

import { futura } from './fonts';
import { palette } from './palette';
import { typography } from './typography';

export function MUIThemeProvider({ children }) {
  const theme = createTheme({
    palette,
    typography,
    spacing: Array.from({ length: 60 }, (_, i) => i * 4),
  });

  theme.components = {
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: 'white',
            opacity: '0.8 !important',
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: 'white',
            opacity: '0.0 !important',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: { variant: 'contained', height: 36 },
      styleOverrides: {
        root: {
          p: '10px',
          minHeight: 36,
          minWidth: 36,
          borderRadius: '10px',
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.fontWeightMedium,
          fontSize: 14,
          '.MuiButton-startIcon': {
            position: 'absolute',
            left: 24,
          },
          '.MuiButton-endIcon': {
            position: 'absolute',
            right: 24,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          inputProps: { sx: { px: 4, py: 3, height: 16, maxHeight: 40, borderRadius: 1 } },
        },
      },
      styleOverrides: {
        root: {
          '.MuiInputBase-input': {
            minHeight: 16,
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.fontWeightMedium,
            lineHeight: 20,
            fontSize: 14,
            color: theme.palette.primary.main,
            '&::placeholder': {
              fontFamily: theme.typography.fontFamily,
              fontWeight: theme.typography.fontWeightMedium,
              lineHeight: 20,
              fontSize: 14,
              color: theme.palette.text.disabled,
            },
            borderRadius: '8px',
          },
          '.MuiFormHelperText-root': {
            display: 'none',
          },
          '&&&& .Mui-error': {
            '.MuiInputBase-input': {
              color: theme.palette.error.main,
              backgroundColor: theme.palette.error.light,
              '&::placeholder': {
                color: theme.palette.error.main,
                opacity: 1,
              },
            },
            fieldset: {
              border: `1px solid ${theme.palette.error.main}`,
            },
          },
          '&&&& .Mui-focused': {
            '.MuiInputBase-input': {
              backgroundColor: theme.palette.background.input_frame_edited,
            },
            fieldset: { border: `1px solid ${theme.palette.border.three}` },
          },
          '&&&& fieldset': {
            border: `1px solid ${theme.palette.border.three}`,
            borderRadius: '8px',
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
          },
          html: {
            height: '100%',
            WebkitOverflowScrolling: 'touch',
          },
          body: {
            display: 'flex',
            flex: '1 1 auto',
            minHeight: '100%',
            flexDirection: 'column',
            overscrollBehavior: 'none',
            margin: 0,
          },
          '#root': {
            display: 'flex',
            flex: '1 1 auto',
            minHeight: '100%',
            flexDirection: 'column',
          },
          '@font-face': [
            {
              fontFamily: futura,
              src: `url(${futura}) format('ttf')`,
            },
          ],
        }}
      />
      {children}
    </ThemeProvider>
  );
}
