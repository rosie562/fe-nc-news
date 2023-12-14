import CommentAdder from "./CommentAdder";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { deleteComment } from "../api";

export default function Comments({ comments, setComments }) {
  const { user } = useContext(UserContext);
  const [deleteFeedback, setDeleteFeedback] = useState("");

  function handleDelete(commentId) {
    const updatedComments = comments.filter(({ comment_id }) => {
      return comment_id !== commentId;
    });
    deleteComment(commentId)
      .then(() => {
        setComments(updatedComments);
        setDeleteFeedback("Comment Deleted");
      })
      .catch(() => {
        setDeleteFeedback("Comment could not be deleted. Please try again");
      })
      .finally(() => {
        setTimeout(() => {
          setDeleteFeedback("");
        }, 5000);
      });
  }

  return (
    <div>
      <p className="p-3 pt-6">Comments:</p>
      <CommentAdder setComments={setComments} />
      {deleteFeedback ? <p>{deleteFeedback}</p> : ""}
      <ol>
        {comments &&
          comments.map((comment) => (
            <section className="border m-4" key={comment.comment_id}>
              <div className="flex justify-between">
                <p className="pl-3 pb-3 m-2 font-bold">{comment.author}</p>
                <p className="m-2">{comment.created_at.substring(0, 10)}</p>
              </div>
              <p className="pl-3 pb-3 m-2">{comment.body}</p>
              {user.username === comment.author ? (
                <div>
                  <button
                    className="px-3 py-1 rounded-md border "
                    onClick={() => {
                      handleDelete(comment.comment_id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                ""
              )}
            </section>
          ))}
      </ol>
    </div>
  );
}
