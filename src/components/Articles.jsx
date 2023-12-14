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
    getAllArticles(topicQuery, filters.topic, filters.sort_by, filters.order)
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
      <section className="container mx-auto p-4">
        {topicQuery ? (
          <h2 className="text-3xl font-bold mb-4">
            {topicQuery.slice(0, 1).toUpperCase() + topicQuery.slice(1)}
          </h2>
        ) : (
          <h2 className="text-3xl font-bold mb-4">Articles</h2>
        )}

        <div className="flex mx-auto mb-4 justify-end">
          <div className="ml-2">
            <label
              className="block text-sm font-medium pb-2 pt-2"
              htmlFor="sort_by"
            >
              Sort By:
            </label>
            <select
              className="border p-4"
              id="sort_by"
              name="sort_by"
              onChange={handleFilter}
            >
              <optgroup label="Sort By">
                <option value="">Date</option>
                <option value="comment_count">Comments</option>
                <option value="votes">Votes</option>
              </optgroup>
            </select>
          </div>
          <div className="ml-2">
            <label
              className="block text-sm font-medium pb-2 pt-2"
              htmlFor="order"
            >
              Order By:
            </label>
            <select
              className="border p-4"
              id="order"
              name="order"
              onChange={handleFilter}
            >
              <optgroup label="order">
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </optgroup>
            </select>
          </div>

          {!topicQuery ? (
            <div className="ml-2">
              <label
                className="block text-sm font-medium pb-2 pt-2"
                htmlFor="topic"
              >
                Filter By Topic:
              </label>
              <select
                className="border p-4"
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
            </div>
          ) : (
            ""
          )}
        </div>
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
