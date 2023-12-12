export default function SingleArticle({ article }) {
  return (
    <div>
      <p className="font-bold p-1 pl-3 pt-3 text-2.5xl mt-2">{article.title}</p>
      <p className="font-bold pl-3 p-1">{article.author}</p>
      <p className="pl-3 p-2 ">{article.created_at.substring(0, 10)}</p>
      <p className=" pl-3 pb-3 p-1">{article.comment_count} comments</p>
      {article.votes ? (
        <p className=" pl-3 pb-3 p-1">{article.votes} votes</p>
      ) : (
        ""
      )}
    </div>
  );
}
