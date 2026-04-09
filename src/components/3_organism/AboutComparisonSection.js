import React from 'react';
import './AboutComparisonSection.css';

function AboutComparisonSection({ label, title, text, advantages, comparison }) {
  const leftPanel = comparison?.left ?? {
    title: 'Обычное объяснение',
    items: ['сложно', 'скучно', 'быстро забывается'],
  };
  const rightPanel = comparison?.right ?? {
    title: 'INSUREKIDS',
    items: ['наглядно', 'интерактивно', 'запоминается через опыт'],
  };

  return (
    <section className="about-comparison">
      <div className="about-comparison__content">
        <p className="about-section__eyebrow">{label}</p>
        <h2>{title}</h2>
        <p>{text}</p>
        <ul className="about-comparison__advantages">
          {advantages.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="about-comparison__panels">
        <div className="about-compare-card about-compare-card--muted">
          <h3>{leftPanel.title}</h3>
          <ul>
            {leftPanel.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="about-compare-card about-compare-card--accent">
          <h3>{rightPanel.title}</h3>
          <ul>
            {rightPanel.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AboutComparisonSection;