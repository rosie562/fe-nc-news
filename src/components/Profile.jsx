import { UserContext } from "../context/UserContext";
import React, { useContext, useState, useEffect } from "react";
import { getUserByUsername } from "../api";
import { getUsers } from "../api";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [existingUser, setExistingUser] = useState("");
  const [loginToggle, setLoginToggle] = useState(true);
  const [isError, setIsError] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  function handleLogin(event) {
    const selectedUsername = event.target.value;

    getUserByUsername(selectedUsername)
      .then((result) => {
        setUser(result[0]);
        setLoginToggle(true);
        console.log("logged in");
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setIsError(true);
      });
  }

  console.log(user);
  useEffect(() => {
    getUsers().then((users) => {
      setAllUsers(users);
    });
  }, []);

  function handleSignOut() {
    setUser({
      username: "",
      name: "",
    });
    setExistingUser("");
    setLoginToggle(true);
  }

  return (
    <div className="m-8 mx-auto max-w-xl">
      {!user.username ? (
        <div className="flex flex-col items-center justify-center rounded-md border p-3">
          <p className="m-4 text-center text-lg">
            You are not logged in. Please log in below:
          </p>
          {loginToggle ? (
            <>
              <select
                className="border p-1"
                id="users"
                name="users"
                onChange={handleLogin}
              >
                {allUsers.map((user) => (
                  <optgroup
                    label={`${user.name} (${user.username})`}
                    key={user.username}
                  >
                    <option value={user.username}>{user.username}</option>
                  </optgroup>
                ))}
              </select>
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
