import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
    const [login,setLogin] =useState(true);
    const [email,setEmail] =useState("staff@clinic.com");
    const [password,setPassword] =useState("123456");

    const handleLogin= ()=>{
        if(email=="staff@clinic.com" && password == "123456"){
        localStorage.setItem("username",email);
        toast.success("Login Successfull")
        setLogin(false);
        }
    }
  return (
    <div>
      {login && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div
            className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl relative m-3"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
              Login
            </h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full transition font-medium"
              >
                Login
              </button>
              
              <p className="text-center text-sm mt-4">
                Don’t have an account?{" "}
                <span
                  className="text-indigo-600 hover:underline cursor-pointer"
                >
                  Sign up
                </span>
              </p>
            </form>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
