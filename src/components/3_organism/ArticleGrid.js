import React from 'react';
import ArticleCard from '../2_molecules/ArticleCard';
import './ArticleGrid.css';

function ArticleGrid({ articles }) {
  return (
    <div className="article-grid">
      {articles.map(article => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
  );
}

export default ArticleGrid;