import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTopics } from "../api";
export default function HomePage() {
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
      <section className="border mx-auto">
        <header className="flex-col text-center p-10 gap-8">
          <h1 className="text-3xl font-bold p-2">NC News</h1>
          <h2 className="text-xl font-bold p-2">Welcome</h2>
        </header>
      </section>
      <div className="flex justify-center border">
        <Link to="/articles">
          <button className="text-align: center m-6 p-5 border">
            Go To Articles
          </button>
        </Link>
      </div>
      <section className="p-6 border">
        <p className="ml-6">Topics:</p>
        <section className="flex justify-center">
          {topics.map((topic) => (
            <div key={topic.slug}>
              <Link to={`/articles?topic=${topic.slug}`}>
                <button className="border p-3 m-3">
                  {topic.slug.slice(0, 1).toUpperCase() + topic.slug.slice(1)}
                </button>
              </Link>
            </div>
          ))}
        </section>
      </section>
    </>
  );
}
