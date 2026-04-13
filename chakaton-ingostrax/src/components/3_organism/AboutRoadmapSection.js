import React from 'react';
import './AboutRoadmapSection.css';

function AboutRoadmapSection({ label, title, text, text2, points, image }) {
  return (
    <section className="about-roadmap">
      <div className="about-roadmap__content">
        <p className="about-section__eyebrow">{label}</p>
        <h2>{title}</h2>
        <p>{text}</p>
        <p>{text2}</p>
        <ul className="about-roadmap__list">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="about-roadmap__visual">
        <img src={image} alt={title} />
      </div>
    </section>
  );
}

export default AboutRoadmapSection;
