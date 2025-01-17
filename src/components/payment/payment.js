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
    const shouldShowTeamAbbr = !['CHS', 'BMTa', 'BMTb'].includes(sportCode);
    const transferContent = `SAB OLF ${sportCode} ${studentId}${shouldShowTeamAbbr ? ` ${teamAbbr}` : ''}`;
    return `https://api.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-ttfzC3g.jpg?&amount=${amount}&addInfo=${encodeURIComponent(
      transferContent
    )}`;
  };

  return (
    <div className='payment-container'>
      <h2>Thông tin chuyển khoản</h2>
      <div className='payment-details'>
        <p>Số tiền: {parseInt(amount).toLocaleString('vi-VN')} VND</p>
        <p>
          Nội dung: SAB OLF {sportCode} {studentId} {teamAbbr}
        </p>
        <p>Vui lòng không thay đổi nội dung chuyển khoản.</p>
        <p>Khi chuyển khoản xong bạn có thể quay về form để tiếp tục đăng ký.</p>
      </div>

      <div className='qr-container'>
        <img src={generateQRCode()} alt='Payment QR Code' className='qr-code' />
      </div>

      <button onClick={() => navigate(-1)} className='back-button'>
        Chỉnh sửa thông tin.
      </button>
    </div>
  );
}

export default Payment;
