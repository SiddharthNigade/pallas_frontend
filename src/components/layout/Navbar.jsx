import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ onAddClick }) => {
  return (
    <header className=" sticky bg-white px-2 py-2 shadow-sm">
      <div className="mx-auto max-w-full px-6">
        <div className="flex items-center justify-between">
          <a className="text-lg font-semibold">Restaurant List</a>

          <button
            type="button"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-200"
            onClick={onAddClick}
          >
            <span className="block sm:hidden">Add</span>
            <span className="hidden sm:block">Add Restaurant</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
