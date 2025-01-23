import React, { useState } from 'react';
import './football.scss';
import { useNavigate } from 'react-router-dom';
function Football() {
  const navigate = useNavigate(); // Add this line

  const [formData, setFormData] = useState({
    teamAbbr: '',
    fullName: '',
    studentId: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (formData.teamAbbr.length !== 3) {
      newErrors.teamAbbr = 'Tên viết tắt phải có đúng 3 ký tự';
    }


    if (!/^\d{8}$/.test(formData.studentId)) {
      newErrors.studentId = 'Mã số sinh viên phải có 8 chữ số';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/payment', {
        state: {
          studentId: formData.studentId,
          teamAbbr: formData.teamAbbr.toUpperCase(),
          sportCode: 'FTB',
          amount: '300000',
        },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='football-registration'>
      <button className='back-button' onClick={() => navigate('/')}>
        ← Trở về
      </button>
      <h1>Thanh toán bộ môn Bóng Đá</h1>

      <div className='fee-info'>
        <h3>Bảng phí</h3>
        <div className='fee-details'>
          <p>Phí tham gia: 200,000 VND</p>
          <p>Phí bảo chứng: 100,000 VND</p>
          <p className='total'>Tổng cộng: 300,000 VND</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Tên viết tắt đội (3 ký tự):</label>
          <input type='text' name='teamAbbr' maxLength='3' value={formData.teamAbbr} onChange={handleChange} />
          {errors.teamAbbr && <span className='error'>{errors.teamAbbr}</span>}
        </div>

        <div className='form-group'>
          <label>MSSV (là MSSV của người đại diện điền form):</label>
          <input
            type='text'
            name='studentId'
            maxLength='8'
            pattern='\d{8}'
            value={formData.studentId}
            onChange={handleChange}
          />
          {errors.studentId && <span className='error'>{errors.studentId}</span>}
        </div>

        <button type='submit'>Thanh toán</button>
      </form>
    </div>
  );
}

export default Football;
