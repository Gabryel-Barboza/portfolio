import { Route, Routes } from 'react-router-dom';

import './App.css';

import MainPage from './pages/MainPage/MainPage';
import Footer from './components/layout/Footer/Footer';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
