import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { ROUTES } from "./routes";
import WithSidebar from "./Wrappers/WithSidebar";
import Users from "./pages/Users";
import Todos from "./pages/Todos";
import ViewTodo from "./pages/ViewTodo";
import Albums from "./pages/Albums";
import Photos from "./pages/Photos";
import ViewPhoto from "./pages/ViewPhoto";

function getRoutes() {
  return [
    {
      path: "/",
      element: <Navigate to={`/${ROUTES.users.href}`} replace />,
    },
    {
      path: ROUTES.users.href,
      element: (
        <WithSidebar>
          <Users />
        </WithSidebar>
      ),
    },
    {
      path: `${ROUTES.users.href}/:userId`,
      element: (
        <WithSidebar>
          <Todos />
        </WithSidebar>
      ),
    },
    {
      path: `${ROUTES.users.href}/:userId/:todoId`,
      element: (
        <WithSidebar>
          <ViewTodo />
        </WithSidebar>
      ),
    },
    {
      path: ROUTES.albums.href,
      element: (
        <WithSidebar>
          <Albums />
        </WithSidebar>
      ),
    },
    {
      path: `${ROUTES.albums.href}/:albumId`,
      element: (
        <WithSidebar>
          <Photos />
        </WithSidebar>
      ),
    },
    {
      path: `${ROUTES.albums.href}/:albumId/:photoId`,
      element: (
        <WithSidebar>
          <ViewPhoto />
        </WithSidebar>
      ),
    },
  ];
}

function App() {
  const element = useRoutes(getRoutes());
  return <div style={{ width: "100vw", height: "100vh" }}>{element}</div>;
}

export default App;
