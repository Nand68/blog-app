import { type JSX } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";

import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AddBlog from "./pages/AddBlog";
import BlogDetail from "./pages/BlogDetail";
import MyBlogs from "./pages/MyBlogs";
import EditBlog from "./pages/EditBlog";
import ErrorPage from "./components/ErrorPage";

import { blogData } from "./dummy-data/Blog";
import { signupAction } from "./actions/signupAction";
import { loginAction } from "./actions/loginAction";


const Protected = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};


const LoginWrapper = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/blogs" replace /> : <LoginPage />;
};

const SignupWrapper = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/blogs" replace /> : <SignUpPage />;
};


const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/blogs" replace /> },
  {
    path: "/blogs",
    element: (
      <Protected>
        <AppLayout />
      </Protected>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "add-blog", element: <AddBlog /> },
      { path: ":id", element: <BlogDetail /> },
      {
        path: "my-blogs",
        element: <MyBlogs />,
        children: [
          {
            path: "edit-blog/:id",
            element: <EditBlog blog={blogData[2]} />,
            loader: ({ params }) =>
              blogData.find((b) => String(b.id) === params.id),
          },
          { path: "delete-blog", element: <div>Delete Blog Page</div> },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginWrapper />, action: loginAction },
  { path: "/signup", element: <SignupWrapper />, action: signupAction },
  { path: "*", element: <ErrorPage /> },
]);

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;
