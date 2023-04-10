import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const hndleLogin = async (event) => {
    event.preventDefault();

    try {
      let response = await axios.post("http://localhost:2000/auth/login", {
        email: email,
        password: password,
      });

      alert("Sukses login");
      console.log(response);
      navigate("/add-event");

      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10">
      <div className="bg-slate-400 bg-slate-300 rounded-lg py-10 max-w-2xl m-auto drop-shadow-xl">
        <form onSubmit={hndleLogin} className="max-w-md mt-8  mx-auto">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-3 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
