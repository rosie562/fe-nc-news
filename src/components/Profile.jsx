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
    <div>
      {!user.username ? (
        <div>
          <p>You are not logged in. Please log in below:</p>
          <button
            className="border m-4"
            onClick={(event) => {
              event.preventDefault();
              setLoginToggle(true);
            }}
          >
            Log In
          </button>
          {loginToggle ? (
            <>
              <label>
                Username:
                <input
                  className="border"
                  type="text"
                  value={existingUser}
                  onChange={(event) => setExistingUser(event.target.value)}
                />
              </label>
              <button
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
          {isError ? <p>User not found</p> : ""}
        </div>
      ) : (
        <>
          <p>Hello {user.username}</p>
          <div>
            <button
              onClick={() => {
                handleSignOut();
              }}
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
