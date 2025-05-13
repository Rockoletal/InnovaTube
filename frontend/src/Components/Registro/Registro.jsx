import React, { useEffect, useRef, useState } from "react";
import fondo from "../../assets/fondo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPerson,
  faUser,
  faEnvelope,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

const Registro = () => {
  const recaptchaRef = useRef(null);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  useEffect(() => {
    const renderCaptcha = () => {
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: "6LcmxTcrAAAAACNkiBJ2JqUzGBCJTV5NLppoztS4", //
          callback: (token) => {
            console.log("reCAPTCHA token:", token);
            setRecaptchaToken(token);
          },
        });
      }
    };

    // Esperar a que grecaptcha esté lista
    if (window.grecaptcha) {
      window.grecaptcha.ready(renderCaptcha);
    } else {
      window.onloadCallback = renderCaptcha;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Por favor, verifica el reCAPTCHA.");
      return;
    }

    // Aquí puedes enviar el token y demás datos al backend
    console.log("Formulario enviado con token:", recaptchaToken);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex justify-center items-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm z-0"
          style={{ backgroundImage: `url(${fondo})` }}
        ></div>

        <div className="flex justify-center items-center w-full max-w-lg h-auto rounded-lg shadow-lg bg-white bg-opacity-90 z-10 p-6 md:p-10">
          <div className="flex flex-col justify-center items-center w-full space-y-6">
            <h2 className="text-left text-3xl font-semibold mb-4 text-gray-800">
              Registrar Usuario
            </h2>
            <form className="w-full space-y-3" onSubmit={handleSubmit}>
              {/* Nombre y Apellido */}
              <div className="relative">
                <FontAwesomeIcon
                  icon={faPerson}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                />
                <input
                  className="w-full px-12 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  type="text"
                  placeholder="Nombre y Apellido"
                  name="nombre"
                  required
                />
              </div>

              {/* Usuario */}
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                />
                <input
                  className="w-full px-12 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  type="text"
                  placeholder="Nombre de Usuario"
                  name="usuario"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                />
                <input
                  className="w-full px-12 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                />
              </div>

              {/* Contraseña */}
              <div className="relative">
                <FontAwesomeIcon
                  icon={faKey}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                />
                <input
                  className="w-full px-12 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  type="password"
                  placeholder="Contraseña"
                  name="contrasena"
                  required
                />
              </div>

              {/* Confirmar Contraseña */}
              <div className="relative">
                <FontAwesomeIcon
                  icon={faKey}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                />
                <input
                  className="w-full px-12 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  type="password"
                  placeholder="Confirmar Contraseña"
                  name="confirmarcontrasena"
                  required
                />
              </div>

              {/* ReCAPTCHA */}
              <div className="flex justify-center">
                <div ref={recaptchaRef}></div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green-700 text-white rounded-md hover:bg-green-800 transition-all text-lg"
              >
                Registrar Usuario
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
