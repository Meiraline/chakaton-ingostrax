import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../1_atoms/SectionTitle';
import ArticleCard from '../2_molecules/ArticleCard';
import Button from '../1_atoms/Button';
import './BlogPreview.css';

const articles = [
  {
    title: 'Что такое страхование жизни?',
    excerpt: 'Коротко и понятно о том, зачем нужна страховка жизни и как она защищает семью.',
    image: '/png/blog.png',
  },
  {
    title: 'Как работает страховка имущества?',
    excerpt: 'Примеры из жизни: когда страховка помогает восстановить дом или машину.',
    image: '/png/1_blok.png',
  },
  {
    title: 'Путешествие и страховка',
    excerpt: 'Почему важно иметь страховку в поездке и как выбрать лучший полис.',
    image: '/png/2_blok.png',
  },
];

function BlogPreview() {
  return (
    <section className="blog-preview" id="blog">
      <SectionTitle title="Блог" subtitle="о страховании простыми словами" />
      <div className="blog-preview__grid">
        {articles.map((article) => (
          <ArticleCard key={article.title} {...article} />
        ))}
      </div>
      <div className="blog-preview__action">
        <Link to="/blog">
          <Button>Другие</Button>
        </Link>
      </div>
    </section>
  );
}

export default BlogPreview;
