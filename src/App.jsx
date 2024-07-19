import logo from './logo.svg';
import './App.css';
import MainContent from './Componanats/MainContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: ['Marhey']
  },
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ height: "100vh" }}>
        <div style={{}}>
          <MainContent />
        </div>

      </div>
    </ThemeProvider>



  );
}
export default App;
