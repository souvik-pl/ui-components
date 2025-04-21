import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { ROUTES } from "../routes";

const Photos = () => {
  const { albumId } = useParams();
  const {
    data: photoList,
    loading,
    error,
  } = useFetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;
  return (
    <div style={{ width: "100%" }}>
      {photoList?.map((photo) => (
        <div
          key={photo.id}
          style={{ width: "500px", border: "1px solid black", margin: "10px" }}
        >
          <p>Title: {photo.title}</p>
          <p>Thumbnail: {photo.thumbnailUrl}</p>
          <p>
            <Link to={`/${ROUTES.albums.href}/${albumId}/${photo.id}`}>
              View Photo
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Photos;
