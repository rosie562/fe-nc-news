import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById } from "../api";

export default function SingleArticle({ article, setIsLoading, isLoading }) {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState(article || {});

  useEffect(() => {
    if (!article && article_id) {
      getArticleById(article_id)
        .then((article) => {
          console.log(article);
          setSingleArticle(article);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [article, article_id]);

  if (isLoading) return <p> Loading... </p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <p className="text-4xl font-bold mb-4 mt-3">{singleArticle.title}</p>
      <p className="font-bold  mb-4">{singleArticle.author}</p>
      <p className=" mb-4 ">
        {singleArticle.created_at
          ? singleArticle.created_at.substring(0, 10)
          : ""}
      </p>
      <p className="mt-2 ">{singleArticle.comment_count} comments</p>
      {singleArticle.votes ? (
        <p className=" pl-3 pb-3 p-1">{singleArticle.votes} votes</p>
      ) : (
        ""
      )}
      <section>
        {article_id ? (
          <div>
            <img
              className="p-3 pl-0 mb-4"
              src={singleArticle.article_img_url}
              alt={singleArticle.title}
              width="600px"
            ></img>
            <p className="text-lg leading-relaxed mb-4">{singleArticle.body}</p>
          </div>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}
