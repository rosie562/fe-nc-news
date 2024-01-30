import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useState, useEffect, useContext } from "react";
import { getTopics } from "../api";
import { getAllArticles } from "../api";

export default function HomePage() {
  const { user } = useContext(UserContext);
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getTopics()
      .then((topicsFromApi) => {
        setTopics(topicsFromApi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAllArticles()
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        setIsError(err.response.data.msg);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      <section className="mx-auto">
        <header className="flex-col gap-8 p-10 text-center">
          <h1 className="mt-8 p-2 font-mono text-8xl font-bold">NC News</h1>
        </header>
      </section>

      <section>
        <div className="flex justify-center ">
          {!user.username ? (
            <Link to="/profile">
              <button className="text-align: center m-6 rounded-md border p-5 font-mono shadow-md hover:bg-gray-100">
                Log in to continue
              </button>
            </Link>
          ) : (
            <div className="flex flex-col justify-center text-center">
              <section className="mx-auto">
                <p className="m-2 font-mono">Browse Topics:</p>
                <section className="m-6 flex flex-wrap justify-center">
                  {topics.length > 0 &&
                    topics.map((topic) => (
                      <div key={topic.slug}>
                        <Link to={`/articles?topic=${topic.slug}`}>
                          <button className="m-2 rounded-md border px-7 py-3 font-mono shadow-md hover:bg-gray-100">
                            {topic.slug.slice(0, 1).toUpperCase() +
                              topic.slug.slice(1)}
                          </button>
                        </Link>
                      </div>
                    ))}
                </section>
                <div className="m-4 mt-6 flex flex-col-reverse justify-end font-mono underline hover:underline sm:flex-row">
                  <Link to="/articles">View All Articles</Link>
                </div>
                <section className="flex flex-wrap">
                  {articles.map((article) => (
                    <div
                      className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
                      key={article.article_id}
                    >
                      <Link to={`/articles/${article.article_id}`}>
                        <div className="rounded-lg border-2 p-4 shadow-lg hover:bg-gray-100">
                          <p className="p-2 font-mono text-lg">
                            {article.title}
                          </p>
                          <img
                            src={article.article_img_url}
                            alt={article.title}
                            className="mb-2 h-32 w-full object-cover"
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </section>
              </section>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
