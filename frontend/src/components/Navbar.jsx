import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav class="bg-gray-800 p-4">
        <div class="flex items-center justify-between">
          <a class="text-white font-bold text-lg" href="#">
            Asep Angga
          </a>

          <div class="items-center">
            <Link to="/" class="text-gray-300 hover:text-white mx-3" href="#">
              Register
            </Link>
            <Link
              to="/login"
              class="text-gray-300 hover:text-white mx-3"
              href="#">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
