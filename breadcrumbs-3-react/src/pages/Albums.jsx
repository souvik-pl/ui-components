import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

const Albums = () => {
  const {
    data: albumList,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/albums");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;
  return (
    <div style={{ width: "100%" }}>
      {albumList?.map((album) => (
        <div
          key={album.id}
          style={{ width: "500px", border: "1px solid black", margin: "10px" }}
        >
          <p>Title: {album.title}</p>
          <p>
            <Link to={`/${ROUTES.albums.href}/${album.id}`}>View Photos</Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Albums;
