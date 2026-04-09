import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../1_atoms/Button';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__brand">
        <Link to="/" className="site-logo">
          <img src="/logo.svg" alt="InsureKids" className="site-logo__image" />
          <span className="site-logo__text">INSUREKIDS</span>
        </Link>
        <nav className="site-nav">
          <Link to="/">Главная</Link>
          <Link to="/blog">Блог</Link>
          <Link to="/contacts">Контакты</Link>
        </nav>
      </div>
      <div className="site-header__actions">
        <Link to="/register">
          <Button variant="secondary">Регистрация</Button>
        </Link>
        <Link to="/login">
          <Button>Вход</Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
