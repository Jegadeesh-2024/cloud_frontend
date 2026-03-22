import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

  const location = useLocation();

  return (
    <div className=" w-full bg-white shadow-md px-6 py-3 flex justify-between items-center relative z-20">

      {/* Logo */}
      <h1 className="text-xl font-bold text-purple-600">
        CloudBase
      </h1>

      {/* Menu */}
      <div className="flex gap-6">

        <Link
          to="/files"
          className={`font-medium ${
            location.pathname === "/files"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600"
          }`}
        >
          Files
        </Link>

        <Link
          to="/folders"
          className={`font-medium ${
            location.pathname === "/folders"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-600"
          }`}
        >
          Folders
        </Link>

      </div>

    </div>
  );
};

export default Navbar;