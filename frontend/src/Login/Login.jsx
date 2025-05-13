import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fondo from "../assets/fondo.jpg"; // Asegúrate de que la ruta sea correcta
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  // Estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Función para alternar la visibilidad dela contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Función para manejar el inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur z-0"
        style={{ backgroundImage: `url(${fondo})` }}
      ></div>
      <div className="flex justify-center items-center w-full max-w-lg h-auto rounded-lg shadow-lg bg-white bg-opacity-90 z-10 p-6 md:p-10">
        <div className="flex flex-col justify-center items-center w-full space-y-6">
          <h2 className="text-left text-3xl font-semibold mb-4 text-gray-800">
            Inicio de sesión
          </h2>
          <form className="w-full space-y-6" onSubmit={handleLogin}>
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              />
              <input
                className="w-full px-12 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                type="text"
                placeholder="Nombre de usuario o correo electrónico"
                //value={}
                name="Usuario"
                required
              />
            </div>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              />
              <input
                className="w-full px-12 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                //value={}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-800 transition-all text-lg"
            >
              Ingresar
            </button>
            <div className="mt-4 text-center">
              <a
                href="/forgotPassword"
                className="text-sm text-gray-700 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
