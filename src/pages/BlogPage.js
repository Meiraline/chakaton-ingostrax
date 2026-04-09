import React, { useMemo, useState } from 'react';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import BlogHeader from '../components/3_organism/BlogHeader';
import ArticleGrid from '../components/3_organism/ArticleGrid';
import FooterSection from '../components/3_organism/FooterSection';
import { getArticles } from '../api/blog';
import './BlogPage.css';

const allArticles = getArticles();

function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = useMemo(() => ['Все', ...new Set(allArticles.map((article) => article.category))], []);

  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesCategory = selectedCategory === 'Все' || article.category === selectedCategory;
      const normalizedSearch = searchTerm.trim().toLowerCase();

      if (!normalizedSearch) {
        return matchesCategory;
      }

      const haystack = [article.title, article.excerpt, article.category, ...article.tags]
        .join(' ')
        .toLowerCase();

      return matchesCategory && haystack.includes(normalizedSearch);
    });
  }, [searchTerm, selectedCategory]);

  return (
    <Layout>
      <Header />
      <BlogHeader
        categories={categories}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />
      <main className="blog-main">
        <section className="blog-main__intro">
          <div className="blog-main__intro-copy">
            <p className="blog-main__eyebrow">Понятный блог о защите, рисках и финансовой грамотности</p>
            <h2>Подбирай статьи под ситуацию и изучай страхование без сложных слов</h2>
            <p className="blog-main__lead">
              Короткие материалы с живыми примерами: от гаджетов и поездок до здоровья и неожиданных расходов.
            </p>
          </div>
          <div className="blog-main__intro-side">
            <p>
              Здесь можно быстро найти нужную тему, сравнить ситуации и лучше понять,
              зачем нужна страховка в обычной жизни.
            </p>
            <div className="blog-main__stats">
              <div className="blog-main__stat">
                <strong>{allArticles.length}</strong>
                <span>статьи</span>
              </div>
              <div className="blog-main__stat">
                <strong>{categories.length - 1}</strong>
                <span>темы</span>
              </div>
              <div className="blog-main__stat">
                <strong>{filteredArticles.length}</strong>
                <span>в подборке</span>
              </div>
            </div>
          </div>
        </section>

        {filteredArticles.length ? (
          <ArticleGrid articles={filteredArticles} />
        ) : (
          <section className="blog-empty">
            <h3>По такому запросу ничего не найдено</h3>
            <p>Попробуй изменить поиск или выбрать другую категорию.</p>
          </section>
        )}
      </main>
      <FooterSection />
    </Layout>
  );
}

export default BlogPage;