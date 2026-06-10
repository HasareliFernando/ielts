import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex gap-6">
        <Link
          to="/"
          className="text-white font-medium hover:text-blue-200"
        >
          Plan Before Writing
        </Link>

        <Link
          to="/write-essay"
          className="text-white font-medium hover:text-blue-200"
        >
          Write Essay
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;