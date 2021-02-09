/* eslint-disable */
import BtnScrollToTop from './BtnScrollToTop';
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import './css/App.css';
import Routes from "./routes/Routes";
import Header from './components/Header/Header';
import SwiperCore, { Scrollbar } from 'swiper';
SwiperCore.use([Scrollbar]); //for Swiper Scrollbar

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <main style={{ minHeight: '0vh' }}>
        <Routes />
        <BtnScrollToTop />
      </main>
    </MuiThemeProvider>
  );
};

export default App;
