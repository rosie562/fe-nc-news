import CommentAdder from "./CommentAdder";

export default function Comments({ comments, setComments }) {
  return (
    <div>
      <p className="p-3 pt-6">Comments:</p>
      <CommentAdder setComments={setComments} />
      {comments.map((comment) => (
        <section className="border m-4" key={comment.comment_id}>
          <div className="flex justify-between">
            <p className="pl-3 pb-3 m-2 font-bold">{comment.author}</p>
            <p className="m-2">{comment.created_at.substring(0, 10)}</p>
          </div>
          <p className="pl-3 pb-3 m-2">{comment.body}</p>
        </section>
      ))}
    </div>
  );
}
