import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CodeAndOutput from "./components/CodeAndOutput.jsx";
import Layout from "./Layout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <CodeAndOutput/>,
      },
      {
        path: "/layout/:layout",
        element: <CodeAndOutput/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
