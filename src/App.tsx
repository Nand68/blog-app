import type { JSX } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AppLayout from "./pages/AppLayout";
import AddBlog from "./pages/AddBlog";
import BlogDetail from "./pages/BlogDetail";
import MyBlogs from "./pages/MyBlogs";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const isLoggedIn = true;

const RootRedirect = () => {
  return isLoggedIn ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },

  // Main app layout (home, add-blog, my-blogs, etc.)
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/add-blog",
    element: (
      <ProtectedRoute>
        <AddBlog />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-blogs",
    element: (
      <ProtectedRoute>
        <MyBlogs />
      </ProtectedRoute>
    ),
  },

  {
    path: "/blog/:id",
    element: (
      <ProtectedRoute>
        <BlogDetail />
      </ProtectedRoute>
    ),
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
