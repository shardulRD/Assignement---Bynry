import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide transition-all hover:text-blue-300"
        >
          Profile Map Explorer
        </Link>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex space-x-6 text-lg font-medium">
            <li>
              <Link
                to="/"
                className="transition-all hover:text-blue-300 hover:underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="transition-all hover:text-blue-300 hover:underline"
              >
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
