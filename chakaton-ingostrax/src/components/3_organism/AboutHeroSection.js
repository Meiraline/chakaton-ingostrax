import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../1_atoms/Button';
import './AboutHeroSection.css';

function AboutHeroSection({
  eyebrow = 'Презентация сервиса',
  title,
  subtitle,
  supportText,
  image,
  cards,
  primaryLabel = 'Начать игру',
  secondaryLabel = 'Как это работает',
}) {
  return (
    <section className="about-hero">
      <div className="about-hero__copy">
        <p className="about-section__eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="about-hero__subtitle">{subtitle}</p>
        <p className="about-hero__text">{supportText}</p>
        <div className="about-hero__actions">
          <Link to="/account">
            <Button>{primaryLabel}</Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="secondary">{secondaryLabel}</Button>
          </a>
        </div>
      </div>

      <div className="about-hero__visual">
        <div className="about-hero__image-wrap">
          <img src={image} alt="INSUREKIDS" />
        </div>
        <div className="about-hero__cards">
          {cards.map((card) => (
            <div key={card.title} className="about-floating-card">
              <span>{card.title}</span>
              <strong>{card.text}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutHeroSection;