import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

const Users = () => {
  const {
    data: userList,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;
  return (
    <div style={{ width: "100%" }}>
      {userList?.map((user) => (
        <div
          key={user.id}
          style={{ width: "500px", border: "1px solid black", margin: "10px" }}
        >
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>
            <Link to={`/${ROUTES.users.href}/${user.id}`}>View Todos</Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Users;
