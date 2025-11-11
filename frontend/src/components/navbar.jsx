import React from "react";
import "../index.css";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm mb-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <p className="btn btn-ghost text-xl">KoreanLearningApp</p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {["Dodaj słówka", "Losuj fiszkę", "Sprawdź statystyki", "Lista słów", "Import/Eksport zasobów"].map((name)=>{
            return(<li>
              <p>{name}</p>
            </li>);
          })}
        </ul>
      </div>
      <div className="navbar-end">
        <p className="btn">Login</p>
      </div>
    </div>
  );
};

export default Navbar;
