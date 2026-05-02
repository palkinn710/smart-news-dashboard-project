import NewsCard from "./NewsCard.jsx";

export default function FeaturedNews({ articles }) {
  if (!articles.length) return null;
  const [lead, ...rest] = articles.slice(0, 4);

  return (
    <section className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <NewsCard article={lead} featured />
      <div className="grid gap-5">
        {rest.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
