import React from 'react';
import ArticleCard from '../2_molecules/ArticleCard';
import './ArticleGrid.css';

function ArticleGrid({ articles }) {
  const safeArticles = Array.isArray(articles) ? articles : [];

  return (
    <div className="article-grid">
      {safeArticles.map(article => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
  );
}

export default ArticleGrid;
