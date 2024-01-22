export default function SingleArticle({ article }) {
  return (
    <div className="m-2">
      <p className="text-xl mt-2 mb-2 p-1 pl-3 pt-3 font-mono font-bold">
        {article.title}
      </p>
      <p className="p-1 pl-3 font-mono font-bold">{article.author}</p>
      <p className="p-2 pl-3 font-mono">
        {article.created_at.substring(0, 10)}
      </p>
      <p className=" p-1 pb-3 pl-3 font-mono">
        {article.comment_count} comments
      </p>
      {article.votes ? (
        <p className=" p-1 pb-3 pl-3 font-mono">
          {article.votes} vote{article.votes > 1 ? "s" : ""}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
