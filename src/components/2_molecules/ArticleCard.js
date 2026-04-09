import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../1_atoms/Button';
import './ArticleCard.css';

function ArticleCard({ id, url, image, title, excerpt, category, tags = [] }) {
  const articleHref = url || `/blog/${id}`;

  return (
    <article className="article-card">
      <Link to={articleHref} className="article-card__image" aria-label={title}>
        <img src={image} alt={title} />
      </Link>
      <div className="article-card__body">
        <div className="article-card__meta">
          <span className="article-card__category">{category}</span>
          {tags.length ? <span className="article-card__tag">#{tags[0]}</span> : null}
        </div>
        <h3>
          <Link to={articleHref}>{title}</Link>
        </h3>
        <p>{excerpt}</p>
      </div>
      <div className="article-card__footer">
        <Link to={articleHref}>
          <Button variant="secondary" size="small">Читать</Button>
        </Link>
      </div>
    </article>
  );
}

export default ArticleCard;