import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-14 bg-gray-300 flex items-center justify-between">
      <p className="ml-5">Criminal Detection</p>
      <div className="flex items-center space-x-10 mr-5">
        <Link to={"/"}>
          <button>Home</button>
        </Link>
        <Link to={"/alert"}>
          <button>Alerts</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
