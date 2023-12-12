import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById, getArticleComments, patchArticle } from "../api";
import Comments from "./Comments";

export default function SingleArticle({ setIsLoading, isLoading }) {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [feedbackVotes, setFeedbackVotes] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((articleById) => {
        setArticle(articleById);
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

  function vote(article_id) {
    setArticle((currArticle) => {
      return { ...currArticle, votes: currArticle.votes + 1 };
    });
    patchArticle(article_id)
      .then(() => {
        setFeedbackVotes("Vote received");
      })
      .catch(() => {
        setFeedbackVotes("Vote not received, please try again");
        setArticle((currArticle) => {
          return { ...currArticle, votes: currArticle.votes - 1 };
        });
      });
  }

  if (isLoading) return <p> Loading... </p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <p className="text-4xl font-bold mb-4 mt-3">{article.title}</p>
      <p className="font-bold  mb-4">{article.author}</p>
      <p className="mb-4">
        {article.created_at ? article.created_at.substring(0, 10) : ""}
      </p>

      {article.votes ? (
        <p className="pb-3">
          {article.votes} vote{article.votes > 1 ? "s" : ""}
        </p>
      ) : (
        ""
      )}
      <div>
        <button className="border p-2" onClick={() => vote(article.article_id)}>
          Vote
        </button>
        {feedbackVotes ? <p className="mt-3 mb-2"> {feedbackVotes}</p> : ""}
        <img
          className="p-3 pl-0 mb-4"
          src={article.article_img_url}
          alt={article.title}
          width="600px"
        ></img>
        <p className="text-lg leading-relaxed mb-4">{article.body}</p>
      </div>
      <p className="mt-6 mb-4">{article.comment_count} comments</p>
      {comments ? <Comments comments={comments} /> : ""}
    </div>
  );
}
