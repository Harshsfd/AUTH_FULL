import React from 'react';

const InputField = ({ label, type, value, onChange, ...props }) => (
  <div style={{ margin: '10px 0' }}>
    <label>{label}</label><br />
    <input type={type} value={value} onChange={onChange} {...props} style={{ padding: '8px', width: '300px' }} />
  </div>
);

export default InputField;
