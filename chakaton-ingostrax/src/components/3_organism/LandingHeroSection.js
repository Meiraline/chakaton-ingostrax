import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../1_atoms/Button';
import './LandingHeroSection.css';

function LandingHeroSection() {
  return (
    <section className="landing-hero">
      <div className="landing-hero__copy">
        <h1>Учись играя</h1>
        <p className="landing-hero__subtitle">
          Интерактивная игра, где ребёнок изучает страхование через приключения
        </p>
        <p className="landing-hero__text">
          Играй, принимай решения и изучай виды страхования вместе с понятным блогом и
          живым игровым персонажем.
        </p>
        <div className="landing-hero__actions">
          <Link to="/blog">
            <Button className="landing-hero__button landing-hero__button--blog">Блог</Button>
          </Link>
          <Link to="/account">
            <Button variant="secondary" className="landing-hero__button landing-hero__button--play">
              Начать играть
            </Button>
          </Link>
        </div>
      </div>

      <div className="landing-hero__visual">
        <img src="/png/glavnaia.png" alt="Дети изучают страхование через игру" />
      </div>
    </section>
  );
}

export default LandingHeroSection;
