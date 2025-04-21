import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { ROUTES } from "../routes";

const Todos = () => {
  const { userId } = useParams();
  const {
    data: todoList,
    loading,
    error,
  } = useFetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;
  return (
    <div style={{ width: "100%" }}>
      {todoList?.map((todo) => (
        <div
          key={todo.id}
          style={{ width: "500px", border: "1px solid black", margin: "10px" }}
        >
          <p>Title: {todo.title}</p>
          <p>
            <Link to={`/${ROUTES.users.href}/${userId}/${todo.id}`}>
              View Todo
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Todos;
