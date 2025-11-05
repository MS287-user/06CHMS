import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

const RegistrationForm = () => {

  const [roles, setRole] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getroles");
      console.log(response.data);
      setRole(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchRoles();
  }, [])
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl w-[90%] mx-auto bg-white rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b">
            <h1 className="text-2xl font-semibold text-gray-800 text-center">
              Register Form
            </h1>
          </div>

          {/* Form Body */}
          <div className="px-6 py-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT SIDE */}
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                {/* Roles Dropdown */}
                <div>
                  <label className="block text-gray-700 mb-1">Roles</label>
                  <select
                    name="roles"
                    className="w-full border px-3 py-2 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="" disabled >Select a role</option>
                    {roles.map((role, index) => (
                      <option key={index} value={role.role}>{role.role}</option>
                    ))}
                    
                  </select>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-4">

                {/* Email */}
                <div>
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>


                {/* Password */}
                <div>
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
              </div>
            </form>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded transition-colors"
              >
                Register
              </button>
              <p className="text-gray-700">
                Already have an account?
                <Link
                  to="/login"
                  className="text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default RegistrationForm