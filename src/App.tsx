import {  type JSX } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AppLayout from "./pages/AppLayout";
import AddBlog from "./pages/AddBlog";
import BlogDetail from "./pages/BlogDetail";
import MyBlogs from "./pages/MyBlogs";
import EditBlog from "./pages/EditBlog";
import { blogData } from "./dummy-data/Blog";
import ErrorPage from "./components/ErrorPage";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { signupAction } from "./actions/signupAction";
import { loginAction } from "./actions/loginAction";

const isLoggedIn = true;

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Navigate to={isLoggedIn ? "/blogs" : "/login"} replace />,
  },
  {
    path: "/blogs",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
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
            loader: ({ params }) => {
              const blog = blogData.find((b) => String(b.id) === params.id);
              return blog;
            },
          },
          { path: "delete-blog", element: <div>Delete Blog Page</div> },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> ,action : loginAction},
  { path: "/signup", element: <SignUpPage />,action : signupAction },
  { path: "*", element: <ErrorPage /> },
]);

const App = () => {
  
  return <RouterProvider router={router} />;
};

export default App;
