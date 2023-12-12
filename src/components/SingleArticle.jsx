import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById, getArticleComments } from "../api";
import Comments from "./Comments";

export default function SingleArticle({ setIsLoading, isLoading }) {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((articleById) => {
        setSingleArticle(articleById);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    getArticleComments(article_id)
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article_id]);

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
      <div>
        <img
          className="p-3 pl-0 mb-4"
          src={singleArticle.article_img_url}
          alt={singleArticle.title}
          width="600px"
        ></img>
        <p className="text-lg leading-relaxed mb-4">{singleArticle.body}</p>
      </div>
      {comments ? <Comments comments={comments} /> : ""}
    </div>
  );
}
