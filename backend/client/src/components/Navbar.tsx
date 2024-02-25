import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-14 bg-red-500 text-white font-semibold flex items-center justify-between text-lg">
      <p className="ml-5">Vigilant Vision</p>
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
