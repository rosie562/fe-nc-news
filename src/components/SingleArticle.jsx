import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById, getArticleComments, patchArticle } from "../api";
import Comments from "./Comments";
import Error from "./Error";

export default function SingleArticle({
  setIsLoading,
  isLoading,
  isError,
  setIsError,
}) {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [feedbackVotes, setFeedbackVotes] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((articleById) => {
        setIsError("");
        setArticle(articleById);
      })
      .catch((err) => {
        setIsError(err.response.data.msg);
        setArticle({});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    getArticleComments(article_id)
      .then((comments) => {
        setComments(comments);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
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

  if (isLoading) {
    return <p> Loading... </p>;
  }
  if (isError) {
    return <Error message={isError} />;
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
      <p className="mb-4 mt-3 font-mono text-4xl font-bold">{article.title}</p>
      <p className="mb-4 font-mono font-bold">{article.author}</p>
      <p className="mb-4 font-mono">
        {article.created_at ? article.created_at.substring(0, 10) : ""}
      </p>

      {article.votes ? (
        <p className="pb-3 font-mono">
          {article.votes} vote{article.votes > 1 ? "s" : ""}
        </p>
      ) : (
        ""
      )}
      <div>
        <button
          className="rounded-md border px-3 py-1 font-mono"
          onClick={() => vote(article.article_id)}
        >
          Vote
        </button>
        {feedbackVotes ? (
          <p className="mb-2 mt-3 font-mono"> {feedbackVotes}</p>
        ) : (
          ""
        )}
        <img
          className="mb-4 p-3 pl-0"
          src={article.article_img_url}
          alt={article.title}
          width="600px"
        ></img>
        <p className="mb-4 font-mono text-lg leading-relaxed">{article.body}</p>
      </div>
      <p className="mb-4 mt-6 font-mono">{article.comment_count} comments</p>

      {comments ? (
        <Comments setComments={setComments} comments={comments} />
      ) : (
        ""
      )}
    </div>
  );
}
