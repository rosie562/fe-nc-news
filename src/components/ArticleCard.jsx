export default function SingleArticle({ article }) {
  return (
    <div>
      <p className="text-2.5xl mt-2 p-1 pl-3 pt-3 font-bold">{article.title}</p>
      <p className="p-1 pl-3 font-bold">{article.author}</p>
      <p className="p-2 pl-3 ">{article.created_at.substring(0, 10)}</p>
      <p className=" p-1 pb-3 pl-3">{article.comment_count} comments</p>
      {article.votes ? (
        <p className=" p-1 pb-3 pl-3">
          {article.votes} vote{article.votes > 1 ? "s" : ""}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
