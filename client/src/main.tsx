import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.tsx";
import ErrorPage from "./ErrorPage.tsx";
import Collections from "./routes/Collections.tsx";
import Submit from "./routes/Submit.tsx";
import Test from "./routes/Test.tsx";

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
        path: "collections/group/test/:groupId",
        element: <Test />,
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
