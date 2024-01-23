import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";
import Error from "./Error";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/circle-loader.json";

export default function Articles({
  isLoading,
  setIsLoading,
  setIsError,
  isError,
}) {
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
        setIsError("");
        setArticles(articles);
      })
      .catch((err) => {
        setIsError(err.response.data.msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filters, topicQuery]);

  if (isLoading) {
    return (
      <div className="m-8 mx-auto flex flex-col items-center">
        <div className="mb-2 text-center">
          <p className="font-mono">Loading...</p>
        </div>
        <div>
          <Lottie
            style={{ width: "50px", height: "50px" }}
            animationData={animationData}
          />
        </div>
      </div>
    );
  }

  if (isError) {
    return <Error message={isError} />;
  }

  return (
    <>
      <section className="container mx-auto p-4">
        {topicQuery ? (
          <h2 className="mb-12 mt-7 text-center font-mono text-6xl font-bold">
            {topicQuery.slice(0, 1).toUpperCase() + topicQuery.slice(1)}
          </h2>
        ) : (
          <h2 className="mb-12 mt-7 text-center font-mono text-6xl font-bold">
            Articles
          </h2>
        )}

        <div className="mb-4 flex flex-col-reverse justify-end font-mono sm:flex-row">
          <div className="lg:ml-2">
            <label
              className="block pb-2 pt-2 font-mono text-sm font-medium"
              htmlFor="sort_by"
            >
              Sort By:
            </label>
            <select
              className="border p-1"
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
          <div className="lg:ml-2">
            <label
              className="block pb-2 pt-2 text-sm font-medium"
              htmlFor="order"
            >
              Order By:
            </label>
            <select
              className="border p-1"
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
            <div className="lg:ml-2">
              <label
                className="block pb-2 pt-2 text-sm font-medium"
                htmlFor="topic"
              >
                Filter By Topic:
              </label>
              <select
                className="border p-1"
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
            <div className="mb-3 mt-3 rounded-md border" key={article.article_id}>
              <ArticleCard article={article} />
              <div className="text-center">
                <Link to={`/articles/${article.article_id}`}>
                  <button className="rounded-md mb-4 border bg-black px-4 py-2 font-mono text-white hover:bg-gray-600">
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
