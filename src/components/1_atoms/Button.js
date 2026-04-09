import React from 'react';
import './Button.css';

function Button({ variant = 'primary', size = 'medium', type = 'button', children, className = '', ...props }) {
  return (
    <button className={`button button--${variant} button--${size} ${className}`.trim()} type={type} {...props}>
      {children}
    </button>
  );
}

export default Button;
