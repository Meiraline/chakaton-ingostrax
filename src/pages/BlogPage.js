import React, { useState } from 'react';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import BlogHeader from '../components/3_organism/BlogHeader';
import ArticleGrid from '../components/3_organism/ArticleGrid';
import FooterSection from '../components/3_organism/FooterSection';
import articlesData from '../data/articles';
import './BlogPage.css';

function BlogPage() {
  const [filteredArticles, setFilteredArticles] = useState(articlesData);

  const handleSearch = (searchTerm) => {
    const filtered = articlesData.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredArticles(filtered);
  };

  const handleFilter = (category) => {
    if (category === 'все') {
      setFilteredArticles(articlesData);
    } else {
      const filtered = articlesData.filter(article => article.category === category);
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