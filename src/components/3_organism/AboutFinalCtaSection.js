import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../1_atoms/Button';
import './AboutFinalCtaSection.css';

function AboutFinalCtaSection({
  label = 'Финальный акцент',
  title,
  text,
  image,
  primaryLabel = 'Открыть игру',
  primaryTo = '/account',
  secondaryLabel = 'Посмотреть блог',
  secondaryTo = '/blog',
}) {
  return (
    <section className="about-final-cta">
      <div className="about-final-cta__copy">
        <p className="about-section__eyebrow">{label}</p>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="about-final-cta__actions">
          <Link to={primaryTo}>
            <Button>{primaryLabel}</Button>
          </Link>
          <Link to={secondaryTo}>
            <Button variant="secondary">{secondaryLabel}</Button>
          </Link>
        </div>
      </div>

      <div className="about-final-cta__visual">
        <img src={image} alt={title} />
      </div>
    </section>
  );
}

export default AboutFinalCtaSection;