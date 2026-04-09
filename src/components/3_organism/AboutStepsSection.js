import React from 'react';
import './AboutStepsSection.css';

function AboutStepsSection({ label, title, text, steps }) {
  return (
    <section className="about-steps-section" id="how-it-works">
      <div className="about-steps-section__head">
        <p className="about-section__eyebrow">{label}</p>
        <h2>{title}</h2>
        {text ? <p>{text}</p> : null}
      </div>

      <div className="about-steps-grid">
        {steps.map((step) => (
          <article
            key={step.title}
            className={`about-step-card ${step.image ? '' : 'about-step-card--text-only'}`.trim()}
          >
            <div className="about-step-card__image">
              {step.image ? (
                <img src={step.image} alt={step.title} />
              ) : (
                <div className="about-step-card__placeholder">
                  <span>{step.tag || 'Игровой шаг'}</span>
                </div>
              )}
            </div>

            <div className="about-step-card__body">
              {step.tag ? <span className="about-step-card__tag">{step.tag}</span> : null}
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {step.additionalText ? <p className="about-step-card__note">{step.additionalText}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AboutStepsSection;