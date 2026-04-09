import React from 'react';
import './FooterSection.css';

function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <div className="site-logo site-logo--footer">INSUREKIDS</div>
        <p>Сервис, созданный для детей, чтобы изучать страхование через игру.</p>
      </div>
      <div className="site-footer__links">
        <div>
          <h4>Страницы</h4>
          <a href="/">Главная</a>
          <a href="/blog">Блог</a>
          <a href="/contacts">Контакты</a>
        </div>
        <div>
          <h4>Контакты</h4>
          <p>+7 (995) 499-02-50</p>
          <a href="mailto:ma.sarycheva2005@gmail.com">ma.sarycheva2005@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
