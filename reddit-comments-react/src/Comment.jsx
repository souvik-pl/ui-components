import React from "react";

function Comment({ commentData }) {
  const { username, comment, replyList } = commentData;
  return (
    <div
      style={{
        marginBottom: "20px",
        borderLeft: "1px solid black",
        paddingLeft: "10px",
      }}
    >
      <div>
        <strong>{username}</strong>
        <p>{comment}</p>
      </div>
      <div
        style={{
          paddingLeft: "40px",
        }}
      >
        {replyList.map((reply) => (
          <Comment commentData={reply} key={reply.id} />
        ))}
      </div>
    </div>
  );
}

export default Comment;
