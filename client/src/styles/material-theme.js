import { createMuiTheme } from '@material-ui/core/styles';

const colors = {
  red: '#ff5652',
  blue: '#112be7'
}

const theme = createMuiTheme({
  palette: {
    common: {
      black: "#313133",
      white: "#fcf6e6",
    },
    primary: {
      main: colors.red,
      contrastText: "#fcf6e6"
    },
    secondary: {
      main: colors.blue,
      contrastText: "#ffffff"
    },
    background: {
      paper: "#fcf6e6",
    },
    text: {
      primary: colors.red,
    }
  },
  typography: {
    fontFamily: [
      "'filson-pro'",
      "Avenir",
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h6: {
      fontWeight: 700,
    },
    fontWeightRegular: 700,
  },
});

export default theme;