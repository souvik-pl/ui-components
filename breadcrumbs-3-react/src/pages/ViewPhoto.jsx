import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const ViewPhoto = () => {
  const { photoId } = useParams();
  const {
    data: photoDetail,
    loading,
    error,
  } = useFetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;
  return (
    <div>
      <p>Title: {photoDetail?.title}</p>
      <p>Thumbnail: {photoDetail?.thumbnailUrl}</p>
      <p>Url: {photoDetail?.url}</p>
    </div>
  );
};

export default ViewPhoto;
