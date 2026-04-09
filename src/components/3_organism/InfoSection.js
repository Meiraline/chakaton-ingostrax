import React from 'react';
import SectionTitle from '../1_atoms/SectionTitle';
import './InfoSection.css';

const cards = [
  {
    title: 'Понятный сервис',
    text: 'Детям 7-14 лет удобно понимать важные темы через игру и яркие персонажи.',
  },
  {
    title: 'Страховки в игре',
    text: 'Покупай страховки, изучай их характеристики и смотри, как они влияют на ход событий.',
  },
  {
    title: 'Блог с примерами',
    text: 'Короткие статьи объясняют виды страхования простым языком.',
  },
];

function InfoSection() {
  return (
    <section className="info-section" id="service">
      <div className="info-section__left">
        <SectionTitle title="О сервисе" subtitle="Обучение страхованию через игру и простые заметки" />
        <p className="info-section__text">
          Наш сервис превращает знакомство со страхованием в понятное и увлекательное приключение. На сайте ребёнок не просто читает о страховых продуктах, а решает ситуации, покупает полисы и учится думать как взрослый.
        </p>
      </div>
      <div className="info-section__cards">
        {cards.map((item) => (
          <div key={item.title} className="info-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InfoSection;
