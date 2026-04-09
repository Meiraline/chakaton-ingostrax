import React from 'react';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import FooterSection from '../components/3_organism/FooterSection';
import SectionTitle from '../components/1_atoms/SectionTitle';
import TeamList from '../components/2_molecules/TeamList';
import './ContactPage.css';

function ContactPage() {
  const team = [
    { name: 'Гриша', role: 'Frontend-разработчик' },
    { name: 'Александр', role: 'Тимлид' },
    { name: 'Егор', role: 'Backend-разработчик' },
    { name: 'Мария', role: 'UX/UI дизайнер' },
  ];

  return (
    <Layout>
      <Header />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-hero__text">
            <SectionTitle title="Контакты" subtitle="и немного о команде" />
            <p>
              Этот проект был создан в рамках IT Purple Hack. Наша команда собрала обучающий сервис, в котором дети изучают страхование через игру, блог и яркую визуальную подачу.
            </p>
          </div>
          <div className="contact-hero__image">
            <img src="/png/kontakti.png" alt="Контакты команды" />
          </div>
        </section>

        <section className="contact-grid">
          <div className="contact-card contact-card--info">
            <h3>Контакты для связи</h3>
            <p>Если у вас есть вопросы или вы хотите обсудить развитие проекта, напишите или позвоните нам.</p>
            <div className="contact-item">
              <span>Телефон</span>
              <a href="tel:+79954990250">+7 (995) 499-02-50</a>
            </div>
            <div className="contact-item">
              <span>Почта</span>
              <a href="mailto:ma.sarycheva2005@gmail.com">ma.sarycheva2005@gmail.com</a>
            </div>
          </div>

          <div className="contact-card contact-card--team">
            <h3>Команда</h3>
            <p>Мы работаем над проектом как единое целое: от дизайна до игровой логики.</p>
            <TeamList team={team} />
          </div>
        </section>
      </main>
      <FooterSection />
    </Layout>
  );
}

export default ContactPage;
