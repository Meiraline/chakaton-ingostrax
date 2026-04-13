import React from 'react';
import './AboutCardsSection.css';

function AboutCardsSection({ label, title, text, cards, note, compact = false }) {
  return (
    <section className="about-cards-section">
      <div className="about-cards-section__head">
        <p className="about-section__eyebrow">{label}</p>
        <h2>{title}</h2>
        {text ? <p>{text}</p> : null}
      </div>

      <div className={`about-cards-grid ${compact ? 'about-cards-grid--compact' : ''}`}>
        {cards.map((card) => (
          <article key={card.title} className="about-info-card">
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>

      {note ? <div className="about-cards-section__note">{note}</div> : null}
    </section>
  );
}

export default AboutCardsSection;
