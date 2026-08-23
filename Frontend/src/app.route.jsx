import { createBrowserRouter, Routes } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Feed from "./features/posts/pages/Feed";
import CreatePost from "./features/posts/pages/CreatePost";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"/",
    element:<Register />
  },
  {
    path:"/feed",
    element:<Feed />
  },
  {
    path:"/createpost",
    element:<CreatePost />
  }
]);
