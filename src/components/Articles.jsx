import { useState, useEffect } from "react";
import { getAllArticles } from "../api";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles()
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section className="border p-4">
        <h2 className="text-2xl font-bold mb-4">Articles:</h2>
        <section className=" grid-cols-1 gap-4">
          {articles.map((article) => (
            <div className="border mt-3 mb-3" key={article.article_id}>
              <Link to={`/${article.article_id}`}>
                <p className="font-bold p-2 pl-3 pt-3 text-2.5xl mt-2">
                  {article.title}
                </p>
              </Link>
              <p className="font-bold pl-3 p-1">{article.author}</p>
              <p className="pl-3 p-2 ">{article.created_at.substring(0, 10)}</p>
              <p className=" pl-3 pb-3 p-1">{article.comment_count} comments</p>
              {article.votes ? (
                <p className=" pl-3 pb-3 p-1">{article.votes} votes</p>
              ) : 
                ""
              }
            </div>
          ))}
        </section>
      </section>
    </>
  );
}
