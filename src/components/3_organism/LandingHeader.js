import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../1_atoms/Button';
import './LandingHeader.css';

function LandingHeader() {
  return (
    <header className="landing-header">
      <div className="landing-header__brand">
        <Link to="/" className="landing-logo" aria-label="InsureKids">
          <img src="/logo.svg" alt="InsureKids" />
        </Link>

        <nav className="landing-nav">
          <Link to="/">Главная</Link>
          <Link to="/blog">Блог</Link>
          <Link to="/contacts">Контакты</Link>
        </nav>
      </div>

      <div className="landing-header__actions">
        <Link to="/register">
          <Button variant="secondary" className="landing-header__button">
            Регистрация
          </Button>
        </Link>
        <Link to="/login">
          <Button className="landing-header__button landing-header__button--login">
            Вход
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default LandingHeader;
