import { RouterProvider } from "@tanstack/react-router";
// 1. Change 'getRouter' to 'router'
import { router } from "./router"; 

export default function App() {
  // 2. Pass the imported router directly
  return <RouterProvider router={router} />;
}