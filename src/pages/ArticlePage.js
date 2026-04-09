import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import FooterSection from '../components/3_organism/FooterSection';
import Button from '../components/1_atoms/Button';
import ArticleSectionRenderer from '../components/3_organism/ArticleSectionRenderer';
import { getArticleByIdOrSlug, getArticleBySlug } from '../api/blog';
import './ArticlePage.css';

function ArticlePage({ articleSlug }) {
  const { id } = useParams();
  const article = articleSlug ? getArticleBySlug(articleSlug) : getArticleByIdOrSlug(id);

  useEffect(() => {
    if (!article) {
      document.title = 'Статья не найдена';
      return;
    }

    document.title = `${article.title} | InsureKids`;
  }, [article]);

  if (!article) {
    return (
      <Layout>
        <Header />
        <main className="article-page">
          <div className="container article-page__missing">
            <h1>Статья не найдена</h1>
            <p>Похоже, ссылка устарела или материал был перемещён.</p>
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
        <div className="container article-shell">
          <section className="article-hero">
            <div className="article-hero__content">
              <div className="article-meta">
                <span className="article-category">{article.category}</span>
                <div className="article-tags">
                  {article.tags.map((tag) => (
                    <span key={tag} className="article-tag">#{tag}</span>
                  ))}
                </div>
              </div>
              <h1>{article.title}</h1>
              <p className="article-excerpt">{article.excerpt}</p>
            </div>
            <div className="article-hero__visual">
              <img src={article.image} alt={article.title} />
            </div>
          </section>

          <section className="article-content">
            {article.sections.map((section, index) => (
              <ArticleSectionRenderer key={`${section.type}-${index}`} section={section} />
            ))}
          </section>

          <div className="article-footer">
            <Link to="/blog">
              <Button variant="secondary">К блогу</Button>
            </Link>
          </div>
        </div>
      </main>
      <FooterSection />
    </Layout>
  );
}

export default ArticlePage;