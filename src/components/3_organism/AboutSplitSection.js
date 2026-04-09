import React from 'react';
import './AboutSplitSection.css';

function AboutSplitSection({
  label,
  title,
  text,
  text2,
  quote,
  callout,
  bullets,
  highlight,
  image,
  reverse = false,
  children,
}) {
  return (
    <section className={`about-split ${reverse ? 'about-split--reverse' : ''}`}>
      <div className="about-split__content">
        {label ? <p className="about-section__eyebrow">{label}</p> : null}
        <h2>{title}</h2>
        {text ? <p>{text}</p> : null}
        {text2 ? <p>{text2}</p> : null}
        {bullets ? (
          <ul className="about-split__list">
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {quote ? <blockquote>{quote}</blockquote> : null}
        {highlight ? <div className="about-split__highlight">{highlight}</div> : null}
        {callout ? <div className="about-split__callout">{callout}</div> : null}
        {children}
      </div>

      {image ? (
        <div className="about-split__visual">
          <img src={image} alt={title} />
        </div>
      ) : null}
    </section>
  );
}

export default AboutSplitSection;
