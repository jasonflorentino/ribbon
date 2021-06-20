import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    common: {
      black: "#313133",
      white: "#fcf6e6",
    },
    primary: {
      main: '#ff5652',
      contrastText: "#fcf6e6"
    },
    background: {
      paper: "#fcf6e6",
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
    fontWeightRegular: 700
  },
});

export default theme;