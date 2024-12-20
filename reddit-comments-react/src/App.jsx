import React from "react";
import Comment from "./Comment";

const commentList = [
  {
    id: "1",
    username: "John Smith",
    comment: "Hi there",
    replyList: [
      {
        id: "11",
        username: "Jane Doe",
        comment: "Nice to meet you",
        replyList: [],
      },
      {
        id: "12",
        username: "Bob Johnson",
        comment: "I'm glad to hear that",
        replyList: [
          {
            id: "121",
            username: "Alice Smith",
            comment: "Thanks for the info",
            replyList: [
              {
                id: "1211",
                username: "David Wilson",
                comment: "I'm glad to hear that too",
                replyList: [],
              },
              {
                id: "1212",
                username: "Emily Davis",
                comment: "I'm glad to hear that too",
                replyList: [],
              },
            ],
          },
          {
            id: "122",
            username: "Charlie Brown",
            comment: "I'm glad to hear that too",
            replyList: [],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    username: "Jane Doe",
    comment: "Hello there",
    replyList: [
      {
        id: "21",
        username: "Bob Johnson",
        comment: "Nice to meet you too",
        replyList: [],
      },
      {
        id: "22",
        username: "Alice Smith",
        comment: "I'm glad to hear that",
        replyList: [
          {
            id: "221",
            username: "David Wilson",
            comment: "I'm glad to hear that too",
            replyList: [],
          },
          {
            id: "222",
            username: "Emily Davis",
            comment: "I'm glad to hear that too",
            replyList: [],
          },
        ],
      },
    ],
  },
];

function App() {
  return (
    <div
      style={{
        marginLeft: "50px",
        marginTop: "50px",
      }}
    >
      {commentList.map((commentData) => (
        <Comment key={commentData.id} commentData={commentData} />
      ))}
    </div>
  );
}

export default App;
