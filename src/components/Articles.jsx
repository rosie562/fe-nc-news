import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";

export default function Articles({ isLoading, setIsLoading }) {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({
    topic: "",
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
    getAllArticles(filters.topic, filters.sort_by, filters.order)
      .then((articles) => {
        setIsLoading(false);
        setArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filters]);

  if (isLoading) return <p> Loading... </p>;

  return (
    <>
      <section>
        <h2 className="text-3xl font-bold ml-6 p-5">Articles</h2>
        <label htmlFor="sort_by">
          Sort By:
          <select
            className="border m-4 p-4"
            id="sort_by"
            name="sort_by"
            onChange={handleFilter}
          >
            <optgroup label="Sort By">
              <option value="comment_count">Comments</option>
              <option value="votes">Votes</option>
              <option value="created_at">Date</option>
            </optgroup>
          </select>
        </label>
        <label htmlFor="sort_by">
          Order By:
          <select
            className="border m-4 p-4"
            id="order"
            name="order"
            onChange={handleFilter}
          >
            <optgroup label="Order">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </optgroup>
          </select>
        </label>
        <label htmlFor="topic">
          Filter By Topic:
          <select
            className="border m-4 p-4"
            id="topic"
            name="topic"
            onChange={handleFilter}
          >
            <optgroup label="topic">
              <option value="coding">Coding</option>
              <option value="football">Football</option>
              <option value="cooking">Cooking</option>
            </optgroup>
          </select>
        </label>
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
