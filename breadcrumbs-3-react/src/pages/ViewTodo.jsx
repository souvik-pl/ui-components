import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const ViewTodo = () => {
  const { todoId } = useParams();
  const {
    data: todoDetail,
    loading,
    error,
  } = useFetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;
  return (
    <div>
      <p>Title: {todoDetail?.title}</p>
      <p>Completed: {todoDetail?.completed ? "Yes" : "No"}</p>
    </div>
  );
};

export default ViewTodo;
