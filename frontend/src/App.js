import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  useLocation
} from "react-router-dom";
import { useEffect } from 'react';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "preline/preline";
import Test from "./pages/Test";


const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/questions",
        element: <Questions />,
      },
      {
        path: "/test",
        element: <Test />
      }
    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;