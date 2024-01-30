export default function SingleArticle({ article }) {
  return (
    <div className="m-4 rounded:md p-4">
      <p className="mb-4 font-mono text-2xl font-bold">{article.title}</p>
      <p className="mb-3 font-mono font-bold">{article.author}</p>
      <p className="mb-3 font-mono text-gray-500">
        {article.created_at.substring(0, 10)}
      </p>
      {article.comment_count > 0 ? (
      <p className="mb-3 font-mono text-gray-500">
        {article.comment_count} comments
      </p>) : ''}
      {article.votes? (
        <p className="mb-2 font-mono text-gray-500">
          {article.votes} vote{article.votes !== 1 ? "s" : ""}
        </p>
      ) : ''}
    </div>
  );
}
