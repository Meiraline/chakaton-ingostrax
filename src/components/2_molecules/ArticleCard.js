import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../1_atoms/Button';
import './ArticleCard.css';

function ArticleCard({ id, image, title, excerpt }) {
  return (
    <article className="article-card">
      <div className="article-card__image">
        <img src={image} alt={title} />
      </div>
      <div className="article-card__body">
        <h3>{title}</h3>
        <p>{excerpt}</p>
      </div>
      <div className="article-card__footer">
        <Link to={`/blog/${id}`}>
          <Button variant="secondary" size="small">Читать</Button>
        </Link>
      </div>
    </article>
  );
}

export default ArticleCard;
