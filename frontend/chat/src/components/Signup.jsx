import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import AuthImagePattern from "./AuthImagePattern"
import { useAuthStore } from "../store/useAuthStore";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const signup = useAuthStore((state) => state.signup);
  const isSignup = useAuthStore((state) => state.isSignup);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.name.trim()) return toast.error("FullName Required");
    if (!formData.email.trim()) return toast.error("email Required");
    if (!formData.password.trim()) return toast.error("Password Required");
    // if (formData.password.length < 6)
    //   return toast.error("Password must be at least 6 charachters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const succ = validate();
    if (succ === true) signup(formData);

    console.log("Signup form data:", formData);
  };

  return (
    <div className="flex justify-between bg-base-100 backdrop-blur-lg bg-base-100/80 bg-gray-900">
      <div className="min-h-screen flex items-center justify-center mx-10">
        <div className=" p-6 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center backdrop-blur-lg bg-base-100/1 ">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirm"
                placeholder="Confirm Password"
                value={formData.confirm}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-blue-600 hover:underline focus:outline-none"
              >
                {showPassword ? "Hide Passwords" : "Show Passwords"}
              </button>
            </div>

            <button
              type="submit"
              disabled={isSignup}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSignup ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Signup;
