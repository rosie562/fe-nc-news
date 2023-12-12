import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <>
      <section className="border mx-auto">
        <header className="flex-col text-center p-10 gap-8">
          <h1 className="text-3xl font-bold p-2">NC News</h1>
          <h2 className="text-xl font-bold p-2">Welcome</h2>
        </header>
      </section>
      <div className="flex justify-center border">
        <Link to="/articles">
          <button className="text-align: center m-6 p-5 border">
            Go To Articles
          </button>
        </Link>
      </div>
    </>
  );
}
