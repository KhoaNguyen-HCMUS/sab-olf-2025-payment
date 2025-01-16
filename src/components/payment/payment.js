import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './payment.scss';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentId, teamAbbr, sportCode, amount } = location.state;

  const BANK_ID = '970437'; // HD Bank
  const ACCOUNT_NO = '2288119968';

  const generateQRCode = () => {
    const transferContent = `SAB OLF ${sportCode} ${studentId} ${teamAbbr}`;
    return `https://api.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-ttfzC3g.jpg?&amount=${amount}&addInfo=${encodeURIComponent(
      transferContent
    )}`;
  };

  return (
    <div className='payment-container'>
      <h2>Payment Information</h2>
      <div className='payment-details'>
        <p>Amount: {parseInt(amount).toLocaleString('vi-VN')} VND</p>
        <p>
          Content: SAB OLF {sportCode} {studentId} {teamAbbr}
        </p>
		<p>Warning: Don't change content of transfer</p>
      </div>

      <div className='qr-container'>
        <img src={generateQRCode()} alt='Payment QR Code' className='qr-code' />
      </div>

      <button onClick={() => navigate(-1)} className='back-button'>
        Back to Registration
      </button>
    </div>
  );
}

export default Payment;
