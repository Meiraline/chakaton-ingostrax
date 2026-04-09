import articles from "../data/articles";

export async function getArticles() {
  return articles;
}

export async function getArticleById(id) {
  return articles.find(article => article.id === parseInt(id));
}