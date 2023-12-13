import { UserContext } from "../context/UserContext";
import React, { useContext, useState } from "react";
import { getUserByUsername } from "../api";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [existingUser, setExistingUser] = useState("");
  const [loginToggle, setLoginToggle] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleLogin(existingUser) {
    getUserByUsername(existingUser)
      .then(() => {
        setIsError(false);
        setUser({ username: existingUser });
      })
      .catch((err) => {
        setIsError(true);
        return err;
      });
  }

  function handleSignOut() {
    setUser({
      username: "",
      name: "",
      avatar: "",
    });
    setExistingUser("");
    setLoginToggle(false);
  }

  return (
    <div className="max-w-xl mx-auto m-8">
      {!user.username ? (
        <div className="p-3 border rounded-md flex flex-col items-center justify-center">
          <p className="m-4 text-lg text-center">
            You are not logged in. Please log in below:
          </p>
          <button
            className="border px-4 py-2 mr-4 rounded-md "
            onClick={(event) => {
              event.preventDefault();
              setLoginToggle(true);
            }}
          >
            Log In
          </button>
          {loginToggle ? (
            <>
              <label className="block mt-2">
                Username:
                <input
                  placeholder="Enter your username here"
                  className="border p-3 pt-2 pb-2 w-full m-1"
                  type="text"
                  value={existingUser}
                  onChange={(event) => setExistingUser(event.target.value)}
                />
              </label>
              <button
                className="rounded-md border px-4 py-2 mt-2"
                onClick={() => {
                  handleLogin(existingUser);
                }}
              >
                Login
              </button>
            </>
          ) : (
            ""
          )}
          {isError ? (
            <>
              <p className="text-red-500 mt-2">User not found</p>{" "}
              <p className="m-2">You can log in as user "cooljmessy" </p>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="mb-4 text-lg">Hello {user.username}</p>
          <div>
            <button
              className="px-4 py-2 border rounded-md"
              onClick={() => {
                handleSignOut();
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
