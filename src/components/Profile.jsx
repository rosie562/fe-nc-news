import { UserContext } from "../context/UserContext";
import React, { useContext, useState, useEffect } from "react";
import { getUserByUsername } from "../api";
import { getUsers } from "../api";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [existingUser, setExistingUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  function handleLogin(event) {
    const selectedUsername = event.target.value;
    getUserByUsername(selectedUsername)
      .then((userFromApi) => {
        setUser(userFromApi);
      })
      .catch((error) => {
        console.log("Error fetching user details:", error);
      });
  }

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
  }

  return (
    <div className="m-8 mx-auto max-w-xl">
      {!user.username ? (
        <div className="flex flex-col items-center justify-center rounded-md p-6">
          <p className="mb-4 text-center font-mono text-lg font-semibold">
            You are not logged in.
          </p>
          <p className="mb-4 text-center font-mono text-lg">
            Please log in as one of the users below:
          </p>
          <div className="flex flex-col items-center font-mono">
            <select
              className="mb-4 border p-2"
              id="users"
              name="users"
              onChange={handleLogin}
            >
              <option value="">Select a user</option>
              <optgroup label="Username">
                {allUsers.map((user) => (
                  <option key={user.username} value={user.username}>
                    {user.name} ({user.username})
                  </option>
                ))}
              </optgroup>
            </select>
            <button
              className="rounded-md border bg-black px-4 py-2 font-mono text-white hover:bg-blue-700"
              onClick={() => {
                handleLogin();
              }}
            >
              Log In
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2 overflow-hidden rounded">
            <img
              src={user.avatar_url}
              alt={`${user.name}'s avatar`}
              className="mx-auto h-32 w-32 rounded-full border object-contain dark:bg-gray-500"
            />
          </div>
          <p className="mb-2 font-mono text-2xl font-bold">{user.name}</p>
          <p className="text-m mb-4 font-mono text-gray-500">{user.username}</p>
          <div>
            <button
              className="rounded-md border bg-black px-4 py-2 font-mono text-white hover:bg-blue-700"
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
