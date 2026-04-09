import React, { useState } from 'react';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import BlogHeader from '../components/3_organism/BlogHeader';
import ArticleGrid from '../components/3_organism/ArticleGrid';
import FooterSection from '../components/3_organism/FooterSection';
import { getArticles } from '../api/blog';
import './BlogPage.css';

function BlogPage() {
  const [filteredArticles, setFilteredArticles] = useState(getArticles());

  const handleSearch = (searchTerm) => {
    const allArticles = getArticles();
    const filtered = allArticles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredArticles(filtered);
  };

  const handleFilter = (category) => {
    const allArticles = getArticles();
    if (category === 'все') {
      setFilteredArticles(allArticles);
    } else {
      const filtered = allArticles.filter(article => article.category === category);
      setFilteredArticles(filtered);
    }
  };

  return (
    <Layout>
      <Header />
      <BlogHeader onSearch={handleSearch} onFilter={handleFilter} />
      <main className="blog-main">
        <ArticleGrid articles={filteredArticles} />
      </main>
      <FooterSection />
    </Layout>
  );
}

export default BlogPage;