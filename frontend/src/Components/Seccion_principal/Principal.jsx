import React from 'react'
import logo from "../../assets/logo.jpg"; // Asegúrate de que la ruta sea correcta
const Principal = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navegación */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <span className="text-lg font-semibold">InnovaTube</span>
        <div>
          <span className="text-gray-700">Bienvenido, "Nombre de usuario"</span>
          <button className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition">
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Área de trabajo */}
      <main className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Listado de videos */}
        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Buscar videos</h2>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <ul className="space-y-2">
            <li className="flex justify-between items-center p-2 border rounded">
              <span>Título del video</span>
              <button className="text-blue-500 hover:underline">
                ⭐ Favorito
              </button>
            </li>
            {/* Más videos aquí */}
          </ul>
        </section>

        {/* Listado de favoritos */}
        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Favoritos</h2>
          <input
            type="text"
            placeholder="Buscar en favoritos..."
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <ul className="space-y-2">
            <li className="flex justify-between items-center p-2 border rounded">
              <span>Título del video favorito</span>
              <button className="text-red-500 hover:underline">
                ❌ Quitar
              </button>
            </li>
            {/* Más favoritos aquí */}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Principal