import React, { useState } from "react";
import Login from "./Login";

const AppBar = () => {
  const username = localStorage.getItem("username").split("@");
//   const [login, setLogin] = useState(true);

  const handleLogin = () => {
    // setLogin(!login);
  };
  return (
    <>
      {/* {!login && <Login />} */}

      <div className="h-14 p-4 bg-blue-500 flex justify-between items-center">
        <div>
          <span className="text-2xl text-white font-bold px-1">Doctors</span>
          <span className="text-2xl text-white font-bold px-1">
            Appointment
          </span>
        </div>
        <button
          className="bg-blue-600 p-2 rounded-2xl text-2xl font-medium text-white hover:bg-blue-700"
          onClick={handleLogin}
        >
          {username[0]}
        </button>
      </div>
    </>
  );
};

export default AppBar;
