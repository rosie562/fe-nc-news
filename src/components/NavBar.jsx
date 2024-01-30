import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import React, { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <nav className="mx-auto flex justify-between border bg-black">
      <div className="flex">
        <Link
          className="text-align p-4 font-mono text-lg font-bold text-white hover:underline"
          to={"/"}
        >
          Home
        </Link>
        <Link
          className="text-align p-4 font-mono text-lg font-bold text-white hover:underline"
          to={"/articles"}
        >
          Articles
        </Link>
      </div>
      {!user.username ? (
        <Link
          className="p-4 text-center font-mono text-lg font-bold text-white hover:underline"
          to={"/profile"}
        >
          Profile
        </Link>
      ) : (
        <div className="flex text-end">
          <div className="text-align p-4 font-mono text-lg text-white">
            Logged in as{" "}
            <Link to="/profile" className=" font-extrabold underline">
              {` ${user.username}`}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
