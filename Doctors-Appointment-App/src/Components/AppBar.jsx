import { useState } from "react";
import Login from "./Login";

const AppBar = () => {
  const [login, setLogin] = useState(false);

  const handleLogin = () => {
    setLogin(!login);
  };
  return (
    <>
      {login && <Login />}
      <div className="h-14 p-4 bg-blue-500 flex justify-between items-center">
        <div>
          <span className="text-2xl text-white font-bold px-1">Doctors</span>
          <span className="text-2xl text-white font-bold px-1">
            Appointment
          </span>
        </div>
        <button
          className="w-10 h-10 bg-blue-600 rounded-full text-2xl font-medium text-white hover:bg-blue-700"
          onClick={handleLogin}
        >
          {localStorage.getItem("username")?.charAt(0).toUpperCase() ||
                    "U"}
        </button>
      </div>
    </>
  );
};

export default AppBar;
