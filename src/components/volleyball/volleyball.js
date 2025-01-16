import React, { useState } from 'react';
import './volleyball.scss';
import { useNavigate } from 'react-router-dom';

function Volleyball() {
  const navigate = useNavigate();

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
          teamAbbr: formData.teamAbbr.toUpperCase(),
          sportCode: 'VLB',
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
    <div className='volleyball-registration'>
      <h1>Thanh toán bộ môn Bóng Chuyền</h1>

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
          <input type='text' name='teamAbbr' value={formData.teamAbbr} onChange={handleChange} maxLength='3' />
          {errors.teamAbbr && <span className='error'>{errors.teamAbbr}</span>}
        </div>

        <div className='form-group'>
          <label>Họ và tên:</label>
          <input type='text' name='fullName' value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <span className='error'>{errors.fullName}</span>}
        </div>

        <div className='form-group'>
          <label>Mã số sinh viên:</label>
          <input type='text' name='studentId' value={formData.studentId} onChange={handleChange} maxLength='8' />
          {errors.studentId && <span className='error'>{errors.studentId}</span>}
        </div>

        <button type='submit'>Thanh toán</button>
      </form>
    </div>
  );
}

export default Volleyball;
