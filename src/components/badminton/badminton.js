import React, { useState } from 'react';
import './badminton.scss';
import { useNavigate } from 'react-router-dom';

function Badminton() {
  const navigate = useNavigate();
  const [playType, setPlayType] = useState('single');

  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    partnerName: '',
    partnerStudentId: '',
  });

  const [errors, setErrors] = useState({});

  const getFees = () => {
    const baseFee = 20000;
    const depositFee = 50000;
    return playType === 'single'
      ? { participation: baseFee, deposit: depositFee, total: baseFee + depositFee }
      : { participation: baseFee * 2, deposit: 2 * depositFee, total: baseFee * 2 + 2 * depositFee };
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ và tên không được để trống';
    }
    if (!/^\d{8}$/.test(formData.studentId)) {
      newErrors.studentId = 'Mã số sinh viên phải có 8 chữ số';
    }

    if (playType === 'double') {
      if (!formData.partnerName.trim()) {
        newErrors.partnerName = 'Họ và tên đồng đội không được để trống';
      }
      if (!/^\d{8}$/.test(formData.partnerStudentId)) {
        newErrors.partnerStudentId = 'Mã số sinh viên đồng đội phải có 8 chữ số';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const fees = getFees();
      const sportCode = playType === 'single' ? 'BMTa' : 'BMTb';
      const transferContent =
        playType === 'single' ? formData.studentId : `${formData.studentId} ${formData.partnerStudentId}`;

      navigate('/payment', {
        state: {
          studentId: transferContent,
          sportCode: sportCode,
          amount: fees.total.toString(),
        },
      });
    }
  };

  return (
    <div className='badminton-registration'>
      <button className='back-button' onClick={() => navigate('/')}>
        ← Trở về
      </button>
      <h1>Thanh toán bộ môn Cầu Lông</h1>

      <div className='play-type-selection'>
        <label>
          <input
            type='radio'
            name='playType'
            value='single'
            checked={playType === 'single'}
            onChange={(e) => setPlayType(e.target.value)}
          />{' '}
          Đánh đơn
        </label>
        <label>
          <input
            type='radio'
            name='playType'
            value='double'
            checked={playType === 'double'}
            onChange={(e) => setPlayType(e.target.value)}
          />{' '}
          Đánh Đôi
        </label>
      </div>

      <div className='fee-info'>
        <h3>Bảng phí</h3>
        <div className='fee-details'>
          <p>Phí tham gia: {getFees().participation.toLocaleString('vi-VN')} VND</p>
          <p>Phí bảo chứng: {getFees().deposit.toLocaleString('vi-VN')} VND</p>
          <p className='total'>Tổng cộng: {getFees().total.toLocaleString('vi-VN')} VND</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Họ và tên:</label>
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          {errors.fullName && <span className='error'>{errors.fullName}</span>}
        </div>

        <div className='form-group'>
          <label>Mã số sinh viên:</label>
          <input
            type='text'
            name='studentId'
            maxLength='8'
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
          />
          {errors.studentId && <span className='error'>{errors.studentId}</span>}
        </div>

        {playType === 'double' && (
          <>
            <div className='form-group'>
              <label>Họ tên đồng đội:</label>
              <input
                type='text'
                name='partnerName'
                value={formData.partnerName}
                onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
              />
              {errors.partnerName && <span className='error'>{errors.partnerName}</span>}
            </div>

            <div className='form-group'>
              <label>Mã số sinh viên đồng đội:</label>
              <input
                type='text'
                name='partnerStudentId'
                maxLength='8'
                value={formData.partnerStudentId}
                onChange={(e) => setFormData({ ...formData, partnerStudentId: e.target.value })}
              />
              {errors.partnerStudentId && <span className='error'>{errors.partnerStudentId}</span>}
            </div>
          </>
        )}

        <button type='submit'>Thanh toán</button>
      </form>
    </div>
  );
}

export default Badminton;
