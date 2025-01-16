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
      newErrors.teamAbbr = 'Team abbreviation must be exactly 3 characters';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!/^\d{8}$/.test(formData.studentId)) {
      newErrors.studentId = 'Student ID must be exactly 8 digits';
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
      <h1>Volleyball Registration</h1>

      <div className='fee-info'>
        <h3>Registration Fees</h3>
        <div className='fee-details'>
          <p>Participation Fee: 200,000 VND</p>
          <p>Deposit Fee: 100,000 VND</p>
          <p className='total'>Total: 300,000 VND</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Team Abbreviation (3 characters):</label>
          <input type='text' name='teamAbbr' value={formData.teamAbbr} onChange={handleChange} maxLength='3' />
          {errors.teamAbbr && <span className='error'>{errors.teamAbbr}</span>}
        </div>

        <div className='form-group'>
          <label>Full Name:</label>
          <input type='text' name='fullName' value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <span className='error'>{errors.fullName}</span>}
        </div>

        <div className='form-group'>
          <label>Student ID (8 digits):</label>
          <input type='text' name='studentId' value={formData.studentId} onChange={handleChange} maxLength='8' />
          {errors.studentId && <span className='error'>{errors.studentId}</span>}
        </div>

        <button type='submit'>Submit Registration</button>
      </form>
    </div>
  );
}

export default Volleyball;
