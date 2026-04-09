import React, { useState } from 'react';
import Button from '../1_atoms/Button';
import './BlogHeader.css';

function BlogHeader({ onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('все');

  const categories = ['все', 'жизнь', 'имущество', 'путешествия', 'здоровье', 'авто', 'бизнес'];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilter(category);
  };

  return (
    <header className="blog-header">
      <div className="blog-header__content">
        <h1>Блог о страховании</h1>
        <p>Простые объяснения сложных тем. Узнайте, как страховки защищают вас и вашу семью.</p>
        
        <form className="blog-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Поиск статей..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="blog-search__input"
          />
          <Button type="submit">Найти</Button>
        </form>

        <div className="blog-filters">
          <span className="blog-filters__label">Категории:</span>
          <div className="blog-filters__buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`blog-filter-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default BlogHeader;