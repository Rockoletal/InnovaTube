import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fondo from "../../assets/fondo.jpg";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usuario: "",
    contrasena: "",
  });
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://backend-innovatube-production-f7a0.up.railway.app/App/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Guardar datos del usuario en el localStorage
        console.log("Login exitoso:", data);
        localStorage.setItem("userdata", data.usuario.nombre);
        localStorage.setItem("id_usuario", data.usuario.id);
        // Guardar token, redirigir, etc.
        alert("Inicio de sesión exitoso");
        navigate("/principal");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error del servidor");
    }
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
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              />
              <input
                className="w-full px-12 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                type="text"
                placeholder="Nombre de usuario o correo electrónico"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
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
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
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
                href="/registro"
                className="text-sm text-gray-700 hover:underline"
              >
                Registrarse
              </a>
              <span className="mx-2 text-gray-400">|</span>
              <a
                href="/recuperar-password"
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
