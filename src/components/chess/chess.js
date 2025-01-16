import React, { useState } from 'react';
import './chess.scss';
import { useNavigate } from 'react-router-dom';

function Chess() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ và tên không được để trống';
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
          sportCode: 'CHS',
          amount: '50000',
        },
      });
    }
  };

  return (
    <div className='chess-registration'>
      <h1>Thanh toán bộ môn Cờ</h1>

      <div className='fee-info'>
        <h3>Bảng phí</h3>
        <div className='fee-details'>
          <p>Phí bảo chứng: 50,000 VND</p>
          <p className='total'>Tổng cộng: 50,000 VND</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Họ tên:</label>
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
          />
          {errors.fullName && <span className='error'>{errors.fullName}</span>}
        </div>

        <div className='form-group'>
          <label>Mã số sinh viên:</label>
          <input
            type='text'
            name='studentId'
            value={formData.studentId}
            onChange={(e) => setFormData((prev) => ({ ...prev, studentId: e.target.value }))}
            maxLength='8'
          />
          {errors.studentId && <span className='error'>{errors.studentId}</span>}
        </div>

        <button type='submit'>Thanh toán</button>
      </form>
    </div>
  );
}

export default Chess;
