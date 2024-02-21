import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  // Navigate,
} from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import Alert from "../pages/Alert";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="alert" element={<Alert />} />
      {/* <Route path="login" element={<Login />} /> */}
    </Route>
  )
);
