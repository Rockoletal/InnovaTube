import React, { useState } from "react";
import fondo from "../../assets/fondo.jpg";

const Password = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/App/recuperar_contrasena/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Se ha enviado un enlace de recuperación a tu correo.");
      } else {
        setError(data.error || "No se pudo enviar el correo.");
      }
    } catch (err) {
      setError("Error del servidor");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover' }}>

      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Recuperar contraseña</h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Correo electrónico</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-800 transition"
          >
            Enviar enlace
          </button>
        </form>
      </div>
    </div>
  );
};

export default Password;
