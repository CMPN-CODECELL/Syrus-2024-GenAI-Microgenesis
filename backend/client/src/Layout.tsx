import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <>
      <div className="overflow-hidden flex gap-8 flex-col">
        {/* <header className="z-50 "> */}
        <Navbar />
        {/* </header> */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
