import React from 'react';
import './LandingAboutSection.css';

const features = [
  {
    title: 'Понятный сервис',
    description: 'Детям 7-14 лет удобно понимать важные темы через игру и яркие персонажи.',
  },
  {
    title: 'Страховки в игре',
    description: 'Покупай страховки, изучай их характеристики и смотри, как они влияют на ход событий.',
  },
  {
    title: 'Блог с примерами',
    description: 'Короткие статьи объясняют виды страхования простым языком.',
  },
];

function LandingAboutSection() {
  return (
    <section className="landing-about">
      <div className="landing-about__intro">
        <div className="landing-about__text">
          <h2>О сервисе</h2>
          <p>
            Этот сервис превращает знакомство со страхованием в понятное и увлекательное
            приключение. На сайте посетитель не просто читает о том, зачем нужны разные
            виды страховок, а учится понимать их через игру.
          </p>
        </div>

        <div className="landing-about__image-card">
          <img src="/png/glavnaia.png" alt="Иллюстрация о сервисе" />
        </div>
      </div>

      <div className="landing-about__story">
        <div className="landing-about__frame">
          <img src="/png/plaer_all.png" alt="Игровой персонаж" />
        </div>

        <div className="landing-about__story-text">
          <p>
            Игровая часть делает обучение живым и интерактивным. У игрока есть персонаж
            со своими ресурсами: деньгами, здоровьем, счастьем, имуществом и страховыми
            полисами.
          </p>
          <p>
            На каждом ходу ему выпадают неожиданные события, хорошие и плохие, а дальше
            всё зависит от его решений: игрок общается с ИИ, выбирает, как поступить, и
            видит последствия своих действий.
          </p>
          <p>
            Так игрок постепенно понимает, как страховка помогает справляться с рисками и
            принимать решения.
          </p>
        </div>
      </div>

      <div className="landing-features">
        {features.map((feature) => (
          <article key={feature.title} className="landing-feature">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LandingAboutSection;
