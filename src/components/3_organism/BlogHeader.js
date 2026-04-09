import React from 'react';
import Button from '../1_atoms/Button';
import './BlogHeader.css';

function BlogHeader({
  categories,
  searchTerm,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}) {
  return (
    <header className="blog-header">
      <div className="blog-header__content container">
        <div className="blog-header__copy">
          <p className="blog-header__eyebrow">Блог InsureKids</p>
          <h1>Учимся понимать страхование на понятных жизненных примерах</h1>
          <p>
            Ищи тему по ситуации, фильтруй статьи по категориям и переходи к тем материалам,
            которые реально пригодятся в игре и в жизни.
          </p>
        </div>

        <div className="blog-header__controls">
          <form className="blog-search" onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              placeholder="Например: телефон, поездка, здоровье"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              className="blog-search__input"
            />
            <Button type="submit">Поиск</Button>
          </form>

          <div className="blog-filters">
            <span className="blog-filters__label">Категории</span>
            <div className="blog-filters__buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`blog-filter-button ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default BlogHeader;