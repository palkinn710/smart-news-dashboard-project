import { FALLBACK_IMAGE } from "./constants.js";

export const getArticleId = (article) =>
  btoa(unescape(encodeURIComponent(article.url || article.title || Math.random())))
    .replaceAll("=", "")
    .slice(0, 18);

export const normalizeArticle = (article, category = "general") => ({
  id: getArticleId(article),
  title: article.title || "Untitled article",
  description: article.description || article.content || "No summary is available yet.",
  content: article.content || article.description || "Open the source to continue reading.",
  url: article.url || "#",
  image:
    article.image ||
    article.urlToImage ||
    article.image_url ||
    FALLBACK_IMAGE,
  source:
    typeof article.source === "string"
      ? article.source
      : article.source?.name || "Unknown source",
  author: article.author || "Newsroom",
  category: article.category || category,
  publishedAt: article.publishedAt || article.published_at || new Date().toISOString(),
});

export const getReadingMinutes = (text = "") =>
  Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 220));
