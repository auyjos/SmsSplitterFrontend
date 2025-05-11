import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Container, Box, AppBar, Toolbar, Typography, Button } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My React App
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Your React App
          </Typography>
          <Typography variant="body1" paragraph>
            This is a starter template using Vite, React, TypeScript, and Material UI.
            Start editing to see some magic happen!
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
