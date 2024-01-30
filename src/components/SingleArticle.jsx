import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById, getArticleComments, patchArticle } from "../api";
import Comments from "./Comments";
import Error from "./Error";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/circle-loader.json";

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
      }).finally(()=>{
        setTimeout(() => {
          setFeedbackVotes("");
        }, 5000);
      });
  }

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
    <div className="mx-auto max-w-2xl p-4">
      <p className="mb-4 mt-3 font-mono text-4xl font-bold">{article.title}</p>
      <div className="mb-4 mt-3 flex items-center justify-between text-gray-500">
        <p className="font-mono font-bold">{article.author}</p>
        <p className="font-mono">
          {article.created_at ? article.created_at.substring(0, 10) : ""}
        </p>
      </div>
      {article.votes? (
        <p className="mb-4 mt-3 font-mono text-gray-500">
          {article.votes} vote{article.votes !== 1 ? "s" : ""}
        </p>
      ) : ''}

      <div className="flex flex-wrap">
        <button
          className="mb-6 rounded-md border bg-black px-4 py-2 font-mono text-white hover:bg-gray-600"
          onClick={() => vote(article.article_id)}
        >
          Vote
        </button>
        {feedbackVotes ? (
          <p className="mb-2 mt-2 justify-items-start font-mono pl-4">
            {feedbackVotes}
          </p>
        ) : (
          ""
        )}
        <div className="flex flex-wrap items-center justify-center">
          <img
            className="mx-auto mb-10 mt-3 h-auto w-full max-w-screen-lg justify-center"
            src={article.article_img_url}
            alt={article.title}
          />
          <p className="mb-4 font-mono text-lg leading-relaxed">
            {article.body}
          </p>
        </div>
      </div>
      <p className="mb-2 mt-6 font-mono">{article.comment_count} comments</p>
      <hr className="my-8 border-t-2 border-gray-300" />

      {comments ? (
        <div>
          <Comments setComments={setComments} comments={comments} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
