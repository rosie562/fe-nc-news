import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";

export default function Articles({ isLoading, setIsLoading }) {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");

  useEffect(() => {
    const fetchArticles = topicQuery
      ? getAllArticles(topicQuery)
      : getAllArticles();
    fetchArticles
      .then((articles) => {
        setIsLoading(false);
        setArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [topicQuery]);

  if (isLoading) return <p> Loading... </p>;

  return (
    <>
      <section>
        {topicQuery ? (
          <h2 className="text-3xl font-bold ml-6 p-5">
            {topicQuery.slice(0, 1).toUpperCase() + topicQuery.slice(1)}
          </h2>
        ) : (
          <h2 className="text-3xl font-bold ml-6 p-5">Articles</h2>
        )}
        <section className="grid grid-cols-1 gap-4 ">
          {articles.map((article) => (
            <div className="mt-3 mb-3 border" key={article.article_id}>
              <ArticleCard article={article} />
              <div className="text-center">
                <Link to={`/articles/${article.article_id}`}>
                  <button className="border p-2 m-3 mb-5 text-1xl text-center">
                    Go to Article
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </section>
      </section>
    </>
  );
}
