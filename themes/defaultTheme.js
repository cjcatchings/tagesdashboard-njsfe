'use client'

import { Poppins } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red, blue, grey, brown, green,
  orange, lightBlue, lightGreen, common } from '@mui/material/colors';

export const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const mainTheme = createTheme({
  status:{
    appHeaderBackground: lightBlue.A100,
    appHeaderText: grey[800]
  },
  palette: {
    primary: {
      main: blue.A700,
    },
    secondary: {
      main: green.A700,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: lightBlue.A200
    }
  },
  typography: {
    fontFamily: poppins.style.fontFamily
  },
  components: { 
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: orange.A100,
          borderTopRightRadius: '1em',
          borderTopLeftRadius: '1em',
          marginRight: '0.25em',
          boxShadow: '2px 2px black'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: lightGreen.A400
        }
      }
    },
    MuiTableRow: {
      styleOverrides:{
        head: {
          '&:nth-of-type(odd)':{
            backgroundColor: red.A100
          }
        },
        root: {
          '&:nth-of-type(odd)':{
            backgroundColor: common.white
          },
          '&:nth-of-type(even)':{
            backgroundColor: grey[300]
          }
        }
      }
    },
    MuiTableCell:{
      styleOverrides: {
        root: {
          padding: 6,
          fontSize: '0.75em'
        }
      }
    },
    DeleteIcon: {
      styleOverrides: {
        root: {
          color: brown.A400
        }
      }
    }
  }
});

export default mainTheme;

export const nflTheme = createTheme ({
  status:{
    appHeaderBackground: red.A700,
    appHeaderText: grey[50]
  },
  palette: {
    primary: {
      main: blue[900],
      600: blue[600],
      300: blue[300]
    },
    secondary: {
      main: red[900],
      600: red[600],
      300: red[300]
    },
    error: {
      main: orange.A200,
    },
    background: {
      default: grey.A100
    }
  },
  typography: {
    fontFamily: poppins.style.fontFamily
  },
  components: { 
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: blue.A100,
          borderTopRightRadius: '1em',
          borderTopLeftRadius: '1em',
          marginRight: '0.25em'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: blue.A200
        }
      }
    },
    MuiTableRow: {
      styleOverrides:{
        head: {
          '&:nth-of-type(odd)':{
            backgroundColor: brown.A200
          }
        },
        root: {
          '&:nth-of-type(odd)':{
            backgroundColor: grey[50]
          },
          '&:nth-of-type(even)':{
            backgroundColor: grey.A400
          }
        }
      }
    },
    MuiTableCell:{
      styleOverrides: {
        root: ({ownerState}) => { 
          if(ownerState["data-isff"]){
            return {
              padding: 5,
              fontSize: '1em'
            }
          }
          return {
            padding: 6,
            fontSize: '0.75em'
          };
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: grey[50]
        }
      }
    }
  }
});