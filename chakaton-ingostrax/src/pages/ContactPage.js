import React from 'react';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import FooterSection from '../components/3_organism/FooterSection';
import TeamList from '../components/2_molecules/TeamList';
import './ContactPage.css';

function ContactPage() {
  const team = [
    { name: 'Григорий Калашников', role: 'Промпт-инженер и специалист по ИИ' },
    { name: 'Александр Изосимов', role: 'Тимлид' },
    { name: 'Егор Скуратов', role: 'Backend-разработчик, DevOps' },
    { name: 'Мария Сарычева', role: 'UX/UI дизайнер, верстальщик' },
  ];

  return (
    <Layout>
      <Header />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-hero__copy">
            <p className="contact-hero__eyebrow">Связаться с нами</p>
            <h1>Контакты команды InsureKids</h1>
            <p className="contact-hero__lead">
              Проект создан в рамках IT Purple Hack. Мы собрали обучающий сервис,
              в котором дети изучают страхование через игру, блог и понятные жизненные примеры.
            </p>
            <div className="contact-hero__chips">
              <span>Игра</span>
              <span>Блог</span>
              <span>Финансовая грамотность</span>
            </div>
          </div>

          <div className="contact-hero__visual">
            <img src="/png/kontakti.png" alt="Иллюстрация команды InsureKids" />
          </div>
        </section>

        <section className="contact-overview">
          <div className="contact-overview__card">
            <p className="contact-overview__label">О проекте</p>
            <h2>Делаем страхование понятным, живым и безопасным для первого знакомства</h2>
          </div>
          <div className="contact-overview__card contact-overview__card--soft">
            <p>
              Если хочешь обсудить проект, предложить сотрудничество или задать вопрос по сервису,
              можно написать нам напрямую. Мы открыты к обратной связи и развитию продукта.
            </p>
          </div>
        </section>

        <section className="contact-grid">
          <article className="contact-card contact-card--primary">
            <p className="contact-card__eyebrow">Контакты</p>
            <h3>Напиши или позвони нам</h3>
            <p>
              Отвечаем по вопросам проекта, демонстрации продукта и возможного развития платформы.
            </p>

            <div className="contact-item">
              <span>Телефон</span>
              <a href="tel:+79954990250">+7 (995) 499-02-50</a>
            </div>
            <div className="contact-item">
              <span>Почта</span>
              <a href="mailto:masarycheva2005@gmail.com">masarycheva2005@gmail.com</a>
            </div>
          </article>

          <article className="contact-card contact-card--secondary">
            <p className="contact-card__eyebrow">Команда</p>
            <h3>Кто делает проект</h3>
            <p>
              Мы работаем как единая команда: от визуального стиля и интерфейсов до API и игровой логики.
            </p>
            <TeamList team={team} />
          </article>
        </section>
      </main>
      <FooterSection />
    </Layout>
  );
}

export default ContactPage;