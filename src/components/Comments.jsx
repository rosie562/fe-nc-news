import CommentAdder from "./CommentAdder";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { deleteComment } from "../api";

export default function Comments({ comments, setComments }) {
  const { user } = useContext(UserContext);
  const [deleteFeedback, setDeleteFeedback] = useState("");

  function handleDelete(event) {
    event.preventDefault();
    const commentId = event.target.value;
    deleteComment(commentId)
      .then(() => {
  
      })
      .catch(() => {
        setDeleteFeedback("Comment could not be deleted. Please try again");
      });
  }
  return (
    <div>
      <p className="p-3 pt-6">Comments:</p>

      <CommentAdder setComments={setComments} />
      <ol>
        {comments.map((comment) => (
          <section className="border m-4" key={comment.comment_id}>
            <div className="flex justify-between">
              <p className="pl-3 pb-3 m-2 font-bold">{comment.author}</p>
              <p className="m-2">{comment.created_at.substring(0, 10)}</p>
            </div>
            <p className="pl-3 pb-3 m-2">{comment.body}</p>
            {user.username === comment.author ? (
              <div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                  onClick={handleDelete}
                  value={comment.comment_id}
                >
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
            {deleteFeedback ? <p>{deleteFeedback}</p> : ""}
          </section>
        ))}
      </ol>
    </div>
  );
}
