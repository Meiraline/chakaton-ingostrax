import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../1_atoms/Button';
import ArticleCard from '../2_molecules/ArticleCard';
import './HomeBlogPreviewSection.css';

function HomeBlogPreviewSection({ label, title, text, articles }) {
  return (
    <section className="home-blog-preview">
      <div className="home-blog-preview__head">
        <p className="home-blog-preview__eyebrow">{label}</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>

      <div className="home-blog-preview__grid">
        {articles.map((article) => (
          <ArticleCard key={article.slug || article.id} {...article} />
        ))}
      </div>

      <div className="home-blog-preview__action">
        <Link to="/blog">
          <Button variant="secondary">Все статьи</Button>
        </Link>
      </div>
    </section>
  );
}

export default HomeBlogPreviewSection;