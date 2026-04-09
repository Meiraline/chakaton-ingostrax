import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import FooterSection from '../components/3_organism/FooterSection';
import Button from '../components/1_atoms/Button';
import articlesData from '../data/articles';
import './ArticlePage.css';

function ArticlePage() {
  const { id } = useParams();
  const article = articlesData.find(a => a.id === parseInt(id));

  if (!article) {
    return (
      <Layout>
        <Header />
        <main className="article-page">
          <div className="container">
            <h1>Статья не найдена</h1>
            <Link to="/blog">
              <Button>Вернуться к блогу</Button>
            </Link>
          </div>
        </main>
        <FooterSection />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <main className="article-page">
        <div className="container">
          <div className="article-header">
            <div className="article-meta">
              <span className="article-category">{article.category}</span>
              <span className="article-tags">
                {article.tags.map(tag => (
                  <span key={tag} className="article-tag">{tag}</span>
                ))}
              </span>
            </div>
            <h1>{article.title}</h1>
            <p className="article-excerpt">{article.excerpt}</p>
          </div>

          <div className="article-image">
            <img src={article.image} alt={article.title} />
          </div>

          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="article-footer">
            <Link to="/blog">
              <Button variant="secondary">← К блогу</Button>
            </Link>
          </div>
        </div>
      </main>
      <FooterSection />
    </Layout>
  );
}

export default ArticlePage;