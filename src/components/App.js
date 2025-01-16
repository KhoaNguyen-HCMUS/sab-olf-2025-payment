import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './App.scss';

import Chess from './chess/chess.js';
import Badmintion from './badminton/badminton.js';
import Football from './football/football.js';
import Volleyball from './volleyball/volleyball.js';
import Payment from './payment/payment.js';

function App() {
  const navigate = useNavigate();

  const handleSportClick = (sport) => {
    navigate(`/${sport}`);
  };

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <div className='App-header'>
              <h1>Thanh toán Hội thao OLYMFIT 2025</h1>
              <div className='sport-buttons'>
                <button className='sport-button badminton' onClick={() => handleSportClick('badminton')}>
                  Cầu Lông
                </button>
                <button className='sport-button chess' onClick={() => handleSportClick('chess')}>
                  Cờ
                </button>
                <button className='sport-button football' onClick={() => handleSportClick('football')}>
                  Bóng Đá
                </button>
                <button className='sport-button volleyball' onClick={() => handleSportClick('volleyball')}>
                  Bóng Chuyền
                </button>
              </div>
            </div>
          }
        />
        <Route path='/chess' element={<Chess />} />
        <Route path='/badminton' element={<Badmintion />} />
        <Route path='/volleyball' element={<Volleyball />} />
        <Route path='/football' element={<Football />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;
