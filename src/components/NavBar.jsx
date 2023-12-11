import { Link } from "react-router-dom";
export default function Header() {
  return (
    <nav className="border flex justify-between mx-auto">
      <div className="flex">
        <Link className="p-4 text-align" to={"/"}>
          Home
        </Link>
        <Link className="p-4 text-align" to={"/articles"}>
          Articles
        </Link>
      </div>
      <Link className="p-4 text-align" to={"/profile"}>
        Profile
      </Link>
    </nav>
  );
}
