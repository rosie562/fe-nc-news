import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { postComment } from "../api";
import Error from "./Error";

export default function CommentAdder({ setComments }) {
  const { article_id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [feedbackComment, setFeedbackComment] = useState("");
  const { user } = useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();
    postComment(user, newComment, article_id)
      .then((newPostedComment) => {
        setNewComment("");
        setComments((currComments) => {
          return [newPostedComment, ...currComments];
        });
        setFeedbackComment("Comment posted");
      })
      .catch(() => {
        setFeedbackComment("Comment not posted. Please try again");
      }).finally(()=>{
        setTimeout(() => {
          setFeedbackComment("");
        }, 5000);
      })
  }

  return (
    <div className="p-3 border rounded-md">
      {user.username ? (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="m-2">
            Comment:
            <textarea
              placeholder="Enter your comment here"
              className="border p-2 w-full mt-2"
              id="newComment"
              multiline="true"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            />
            <button className="border px-4 py-2 rounded-md">Add</button>
            {feedbackComment ? (
              <Error className="mt-3 mb-2" message={feedbackComment} />
            ) : (
              ""
            )}
          </label>
        </form>
      ) : (
        <div className="text-center">
          <Error className="m-3"
            message='You are not logged in. Please log in to post a comment.'
          />
          <Link to={"/profile"}>
            <button className="border px-4 py-2 rounded-md">Login Here</button>
          </Link>
        </div>
      )}
    </div>
  );
}
