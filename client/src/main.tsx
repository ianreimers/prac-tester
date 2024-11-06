import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.tsx";
import ErrorPage from "./ErrorPage.tsx";
import Collections from "./routes/Collections.tsx";
import Submit from "./routes/Submit.tsx";
import GroupTest from "./routes/GroupTest.tsx";
import CollectionTest from "./routes/CollectionTest.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "collections",
        element: <Collections />,
        children: [],
      },
      {
        path: "collections/test/:groupId",
        element: <CollectionTest />,
      },
      {
        path: "collections/group/test/:groupId",
        element: <GroupTest />,
      },
      {
        path: "submit",
        element: <Submit />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 
    <App />
    */}
    <RouterProvider router={router} />
  </StrictMode>,
);
