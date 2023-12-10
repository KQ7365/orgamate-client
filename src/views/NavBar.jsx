import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          Home
        </Link>
        <div className="flex space-x-20">
          <Link to="/items" className="text-white">
            All Items
          </Link>
          <Link to="/customize" className="text-white">
            Customize
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/login" className="text-white">
            Logout
          </Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
