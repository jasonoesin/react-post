import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center py-2 px-4 w-full ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-4 h-5 w-5 fill-white"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={() => setOpen(true)}
        >
          <path
            fillRule="evenodd"
            d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <img
          className="w-40 mr-24"
          src="https://1000logos.net/wp-content/uploads/2022/03/Rick-and-Morty.png"
        />
      </div>
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="bg-black opacity-60 fixed inset-0 z-10"
          ></div>

          <div className="bg-white fixed inset-0 z-20 w-1/2 text-xs px-3 py-3">
            <img
              className="w-40"
              src="https://1000logos.net/wp-content/uploads/2022/03/Rick-and-Morty.png"
            />
            <ul className="space-y-3 text-gray-600">
              <Link
                onClick={() => {
                  setOpen(false);
                }}
                to={"/"}
              >
                <li>Character</li>
              </Link>
              {/* <li>Episodes</li> */}
              <Link
                onClick={() => {
                  setOpen(false);
                }}
                to={"/favorite"}
              >
                <li>Favorite</li>
              </Link>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
