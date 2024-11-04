import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.tsx";
import ErrorPage from "./ErrorPage.tsx";
import Questions from "./routes/Questions.tsx";
import Submit from "./routes/Submit.tsx";
import Test from "./routes/Test.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "questions",
        element: <Questions />,
        children: [],
      },
      {
        path: "questions/test/:groupId",
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
