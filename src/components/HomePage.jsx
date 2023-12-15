import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useState, useEffect, useContext } from "react";
import { getTopics } from "../api";

export default function HomePage() {
  const { user, setUser } = useContext(UserContext);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then((topicsFromApi) => {
        setTopics(topicsFromApi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section className="mx-auto">
        <header className="flex-col gap-8 p-10 text-center">
          <h1 className="mt-8 p-2 font-mono text-5xl font-bold">NC News</h1>
        </header>
      </section>

      <section>
        <div className="flex justify-center ">
          {!user.username ? (
            <Link to="/profile">
              <button className="text-align: center m-6 rounded-md border p-5 font-mono shadow-md">
                Log in to continue
              </button>
            </Link>
          ) : (
            <div className="flex flex-col justify-center text-center">
              <p className="p-2 font-mono text-lg">
                Welcome back {user.username}!
              </p>
              <section className="p-6">
                <p className="m-2 font-mono">Browse Topics:</p>

                {topics.length > 0 && (
                  <section className="flex justify-center">
                    {topics.map((topic) => (
                      <div key={topic.slug}>
                        <Link to={`/articles?topic=${topic.slug}`}>
                          <button className="m-2 rounded-md border px-7 py-3 font-mono shadow-md">
                            {topic.slug.slice(0, 1).toUpperCase() +
                              topic.slug.slice(1)}
                          </button>
                        </Link>
                      </div>
                    ))}
                  </section>
                )}
                <Link to="/articles">
                  <button className="m-6 rounded-md border p-5 font-mono shadow-md">
                    Go to Articles
                  </button>
                </Link>
              </section>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
