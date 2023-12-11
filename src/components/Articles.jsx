import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import SingleArticle from "./SingleArticle";

export default function Articles({ isLoading, setIsLoading }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles()
      .then((articles) => {
        setIsLoading(false);
        setArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) return <p> Loading... </p>;

  return (
    <>
      <section className="border p-4">
        <h2 className="text-2xl font-bold mb-4">Articles:</h2>
        <section className="grid grid-cols-1 gap-4">
          {articles.map((article) => (
            <div className="border mt-3 mb-3" key={article.article_id}>
              <SingleArticle article={article} />
            </div>
          ))}
        </section>
      </section>
    </>
  );
}
