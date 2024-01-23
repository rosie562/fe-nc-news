import { UserContext } from "../context/UserContext";
import React, { useContext, useState, useEffect } from "react";
import { getUserByUsername } from "../api";
import { getUsers } from "../api";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/circle-loader.json";

export default function Profile({ isLoading, setIsLoading }) {
  const { user, setUser } = useContext(UserContext);
  const [existingUser, setExistingUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  console.log(isLoading);
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
    setIsLoading(true);
    getUsers().then((users) => {
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="m-8 mx-auto flex flex-col items-center">
        <div className="mb-2 text-center">
          <p className="font-mono">Loading...</p>
        </div>
        <div>
          <Lottie
            style={{ width: "50px", height: "50px" }}
            animationData={animationData}
          />
        </div>
      </div>
    );
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
              className="rounded-md border bg-black px-4 py-2 font-mono text-white hover:bg-gray-600"
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
              className="rounded-md border bg-black px-4 py-2 font-mono text-white hover:bg-gray-600"
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
