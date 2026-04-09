import articles from "../data/articles";

export function getArticles() {
  return articles;
}

export function getArticleById(id) {
  return articles.find(article => article.id === parseInt(id, 10));
}
