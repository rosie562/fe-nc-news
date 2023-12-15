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
    <div className="m-8 mx-auto max-w-xl">
      {!user.username ? (
        <div className="flex flex-col items-center justify-center rounded-md border p-3">
          <p className="m-4 text-center text-lg">
            You are not logged in. Please log in below:
          </p>
          <button
            className="mr-4 rounded-md border px-4 py-2 "
            onClick={(event) => {
              event.preventDefault();
              setLoginToggle(true);
            }}
          >
            Log In
          </button>
          {loginToggle ? (
            <>
              <label className="mt-2 block">
                Username:
                <input
                  placeholder="Enter your username here"
                  className="m-1 w-full border p-3 pb-2 pt-2"
                  type="text"
                  value={existingUser}
                  onChange={(event) => setExistingUser(event.target.value)}
                />
              </label>
              <button
                className="mt-2 rounded-md border px-4 py-2"
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
              <p className="mt-2 text-red-500">User not found</p>{" "}
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
              className="rounded-md border px-4 py-2"
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
