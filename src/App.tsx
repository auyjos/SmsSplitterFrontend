import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { SmsForm } from './components/SmsForm';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SmsForm />
    </ThemeProvider>
  );
}

export default App;
