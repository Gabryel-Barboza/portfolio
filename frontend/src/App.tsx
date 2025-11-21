import { Route, Routes } from 'react-router-dom';

import './App.css';

import MainPage from './pages/MainPage/MainPage';
import Footer from './components/layout/Footer/Footer';
import ServerProvider from './context/ServerProvider';

const App = () => {
  return (
    <ServerProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>

      <Footer />
    </ServerProvider>
  );
};

export default App;
