import { CATEGORIES } from "../utils/constants.js";

const sources = ["MediaPulse", "Daily Wireframe", "Global Desk", "Culture Beat"];

export const mockArticles = Array.from({ length: 36 }, (_, index) => {
  const category = CATEGORIES[index % CATEGORIES.length];
  return {
    title: `${category} briefing: smart updates shaping the week ${index + 1}`,
    description:
      "A concise newsroom summary with context, impact, and signals for readers tracking fast-moving stories.",
    content:
      "This demo story keeps the dashboard usable when an API key is not configured. Add a GNews or NewsAPI key to fetch live headlines.",
    url: `https://example.com/news/${index + 1}`,
    image: `https://source.unsplash.com/1200x800/?${category},news&sig=${index}`,
    source: { name: sources[index % sources.length] },
    author: "Smart News Desk",
    category,
    publishedAt: new Date(Date.now() - index * 3600 * 1000).toISOString(),
  };
});
