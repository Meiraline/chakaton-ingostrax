import articles from '../data/articles';

export function getArticles() {
  return articles;
}

export function getArticleById(id) {
  return articles.find((article) => article.id === parseInt(id, 10));
}

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug || article.url === `/${slug}`);
}

export function getArticleByIdOrSlug(value) {
  return getArticleById(value) || getArticleBySlug(value);
}