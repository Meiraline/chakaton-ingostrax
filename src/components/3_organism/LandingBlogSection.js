import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../1_atoms/Button';
import './LandingBlogSection.css';

const previewArticles = [
  {
    id: 1,
    title: 'Страхование жизни',
    excerpt: 'Коротко и понятно о том, зачем нужна страховка жизни и как она помогает семье.',
    image: '/png/blog.png',
  },
  {
    id: 2,
    title: 'Страхование имущества',
    excerpt: 'Разбираем, как работает защита дома, квартиры, техники и других важных вещей.',
    image: '/png/1_blok.png',
  },
  {
    id: 3,
    title: 'Страхование путешествий',
    excerpt: 'Простое объяснение, почему страховка в поездке помогает избежать лишних рисков и расходов.',
    image: '/png/2_blok.png',
  },
];

function LandingBlogSection() {
  return (
    <section className="landing-blog">
      <h2>Блог</h2>
      <p className="landing-blog__lead">
        В нашем блоге собраны короткие статьи, написанные простым языком: они помогают
        разобраться, что такое страхование здоровья, имущества, путешествий и других
        жизненных ситуаций без сложных терминов и скучных объяснений.
      </p>
      <p className="landing-blog__lead">
        Пользователь может обращаться к этим статьям во время игры и тем самым
        увеличивать свои шансы на успех в игре и в жизни.
      </p>

      <div className="landing-blog__grid">
        {previewArticles.map((article) => (
          <Link key={article.id} to={`/blog/${article.id}`} className="landing-article">
            <div className="landing-article__image">
              <img src={article.image} alt={article.title} />
            </div>
            <div className="landing-article__body">
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="landing-blog__action">
        <Link to="/blog">
          <Button className="landing-blog__button">Другие</Button>
        </Link>
      </div>
    </section>
  );
}

export default LandingBlogSection;
