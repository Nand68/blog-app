import { redirect } from "react-router-dom";
import type { Login } from "../common/types";
import { FIREBASE_URL } from "../services/api";

export const loginAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "username and password are required" };
  }

  const response = await fetch(`${FIREBASE_URL}/usersData.json`);
  const usersData = await response.json();
  const users: Login[] = usersData ? Object.values(usersData) : [];

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return { error: "Invalid username or password" };
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  return redirect("/blogs");
};
