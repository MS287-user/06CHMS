import axios from "axios";
import React from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({loginUser}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password
      });
      setEmail("");
      setPassword("");
      console.log(response.data.message);
      toast.success(response.data.message);
      loginUser(response.data.registeredUser);
      navigate("/dashboard");
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className=" bg-gray-100 min-h-screen flex flex-col justify-center">
        <div className="max-w-md w-[50%] mx-auto bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h1 className="text-2xl font-semibold text-gray-800">
              Login Form
            </h1>
          </div>
          <div className="px-6 py-6">
            <form className="space-y-4" onSubmit={handleSubmission}>

              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border px-3 py-2 rounded text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full border px-3 py-2 rounded text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
              >
                Login
              </button>
              {/* <p className="text-gray-700">
                Not registered yet?
                <Link
                  to="/register"
                  className="text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Login here
                </Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
};

export default LoginForm;
