import React from 'react';
import { Link } from 'react-router-dom';
import './FooterSection.css';

function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <img src="/logo.svg" alt="InsureKids" className="site-footer__logo" />
        <p>*Сделано в рамках IT Purple Hack</p>
      </div>

      <div className="site-footer__links">
        <div className="site-footer__column">
          <h4>Страницы</h4>
          <Link to="/">Главная</Link>
          <Link to="/blog">Блог</Link>
          <Link to="/contacts">Контакты</Link>
          <Link to="/login">Вход</Link>
          <Link to="/register">Регистрация</Link>
        </div>

        <div className="site-footer__column">
          <h4>Контакты</h4>
          <Link to="/contacts">Связаться с нами</Link>
          <a href="tel:+79954990250">+7 (995) 499-02-50</a>
          <a href="mailto:ma.sarycheva2005@gmail.com">ma.sarycheva2005@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;