import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";

import { useSearchParams } from "react-router-dom";

export default function Articles({ isLoading, setIsLoading }) {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");
  const [filters, setFilters] = useState({
    topic: topicQuery || "",
    sort_by: "created_at",
    order: "desc",
  });

  function handleFilter(event) {
    const { name, value } = event.target;
    setFilters((currFilters) => ({
      ...currFilters,
      [name]: value,
    }));
  }

  useEffect(() => {
    getAllArticles(topicQuery, filters.topic)
      .then((articles) => {
        setIsLoading(false);
        setArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filters, topicQuery]);

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
        {!topicQuery ? (
          <label htmlFor="topic" className="m-2 p-3">
            Filter By Topic:
            <select
              className="border m-2 p-3"
              id="topic"
              name="topic"
              onChange={handleFilter}
            >
              <optgroup label="topic">
                <option value="">All Topics</option>
                <option value="coding">Coding</option>
                <option value="football">Football</option>
                <option value="cooking">Cooking</option>
              </optgroup>
            </select>
          </label>
        ) : (
          ""
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
