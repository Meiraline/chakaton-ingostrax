import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../1_atoms/Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-section__content">
        <span className="hero-section__eyebrow">Учись играя</span>
        <h1>Интерактивная игра, где ребёнок изучает страхование через приключения</h1>
        <p>Играй, принимай решения и изучай виды страхования вместе с понятным блогом и живым игровым персонажем.</p>
        <div className="hero-section__actions">
          <Button>Начать игру</Button>
          <Link to="/blog">
            <Button variant="secondary">Перейти в блог</Button>
          </Link>
        </div>
      </div>
      <div className="hero-section__visual">
        <img src="/png/glavnaia.png" alt="Игровой обучающий сервис" />
      </div>
    </section>
  );
}

export default HeroSection;
