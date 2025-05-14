import React, { useEffect, useState } from "react";
import fondo from "../../assets/fondo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const API_KEY = "AIzaSyAFCH91yCt97McpYHsf_NFfl1MY8CySme4"; // Api key de YouTube

const Principal = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [favoriteSearch, setFavoriteSearch] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const usuarioId = localStorage.getItem("id_usuario");
  const navigate = useNavigate(); // Instanciar useNavigate
  const buscarVideos = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          searchTerm
        )}&type=video&key=${API_KEY}&maxResults=10`
      );
      const data = await response.json();
      if (data.items) {
        setVideos(data.items);
      }
    } catch (error) {
      console.error("Error al buscar videos:", error);
    }
  };

  const guardarFavorito = async (video, usuarioId) => {
    const favorito = {
      video_id: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.default.url,
      usuario: usuarioId,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/App/guardar_favorito/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(favorito),
        }
      );

      if (!response.ok) throw new Error("Error al guardar el favorito");
      const data = await response.json();
      console.log("Favorito guardado:", data);
    } catch (error) {
      console.error("Error al guardar favorito:", error);
    }
  };

  const obtenerFavoritos = async (usuarioId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/App/obtener_favoritos/?usuario=${usuarioId}`
      );
      if (!response.ok) throw new Error("Error al obtener favoritos");
      const data = await response.json();

      // Convertir estructura para que coincida con la de YouTube
      const transformados = data.map((video) => ({
        id: { videoId: video.video_id },
        snippet: {
          title: video.title,
          thumbnails: {
            default: { url: video.thumbnail },
          },
        },
      }));

      setFavorites(transformados);
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
    }
  };

  useEffect(() => {
    if (usuarioId) {
      obtenerFavoritos(usuarioId);
    }
  }, [usuarioId]);

  const eliminarFavorito = async (videoId, usuarioId) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/App/eliminar_favorito/",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ video_id: videoId, usuario: usuarioId }),
        }
      );

      if (!response.ok) throw new Error("Error al eliminar favorito");

      const data = await response.json();
      console.log("Favorito eliminado:", data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userdata"); // Eliminar datos del usuario
    navigate("/"); // Redirigir a la página de inicio
  };
  const toggleFavorite = async (video) => {
    const videoId = video.id.videoId;
    const exists = favorites.find((f) => f.id.videoId === videoId);

    try {
      if (exists) {
        await eliminarFavorito(videoId, usuarioId);
      } else {
        await guardarFavorito(video, usuarioId);
      }
      // Siempre actualiza la lista después
      await obtenerFavoritos(usuarioId);
    } catch (error) {
      console.error("Error al actualizar favoritos:", error);
    }
  };


  const isFavorite = (
    videoId // Verificar si el video es favorito
  ) => favorites.some((v) => v.id.videoId === videoId);

  const filteredFavorites = favorites.filter(
    (
      video // Filtrar favoritos
    ) =>
      video.snippet.title.toLowerCase().includes(favoriteSearch.toLowerCase())
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        buscarVideos();
      }
    }, 500); // Espera 500 ms tras dejar de escribir

    return () => clearTimeout(delayDebounce); // Limpia si se escribe algo nuevo
  }, [searchTerm]);

  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{ backgroundImage: `url(${fondo})`, backgroundSize: "cover" }}
    >
      <header className="bg-white shadow p-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <span className="text-lg font-semibold">InnovaTube</span>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">
            Bienvenido, "{localStorage.getItem("userdata")}"
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Columna Buscar videos */}
        <section className="bg-white p-4 md:col-span-3 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Buscar videos</h2>

          {/* Reproductor */}
          {selectedVideoId && ( // Reproductor de video
            <div className="mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideoId}`} // URL del video
                className="w-full h-64 md:h-80 rounded max-h-[400px]"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video Player"
              ></iframe>
            </div>
          )}

          <div className="flex mb-4">
            <input
              type="text"
              value={searchTerm} // Termino de busqueda
              onChange={(e) => setSearchTerm(e.target.value)} // Cambiar el valor
              placeholder="Buscar"
              className="w-full p-2 border border-gray-300 rounded-l"
            />
            <button
              onClick={buscarVideos}
              className="bg-gray-500 text-white px-4 py-2 rounded-r hover:bg-gray-700"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>

          <ul className="space-y-2 max-h-[400px] overflow-y-auto">
            {videos.map(
              (
                video // Mapeo de videos
              ) => (
                <li
                  key={video.id.videoId} // ID del video
                  className="flex items-center p-2 border rounded space-x-2"
                >
                  <img
                    src={video.snippet.thumbnails.medium.url} // URL de la miniatura
                    alt={video.snippet.title} // Titulo del video
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <button
                      onClick={() => setSelectedVideoId(video.id.videoId)} // Cambiar el video seleccionado
                      className="text-left w-full text-sm font-semibold line-clamp-2 hover:underline"
                    >
                      {video.snippet.title}
                    </button>
                  </div>
                  <button
                    onClick={() => toggleFavorite(video)}
                    className={`${
                      isFavorite(video.id.videoId)
                        ? "text-yellow-500"
                        : "text-blue-500"
                    } hover:underline`}
                  >
                    {isFavorite(video.id.videoId) ? (
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="text-red-500 animate-pulse"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="text-red-700"
                      />
                    )}
                  </button>
                </li>
              )
            )}
          </ul>
        </section>

        {/* Columna derecha: favoritos */}
        <section className="bg-white p-4 rounded shadow md:col-span-1">
          <h2 className="text-xl font-semibold mb-2">Favoritos</h2>
          <input
            type="text"
            placeholder="Buscar videos favoritos"
            value={favoriteSearch}
            onChange={(e) => setFavoriteSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <ul className="space-y-2 ">
            {filteredFavorites.map(
              (
                video // Mapeo de favoritos
              ) => (
                <li
                  key={video.id.videoId} // ID del video
                  className="flex items-center p-2 border rounded space-x-2"
                >
                  <img
                    src={video.snippet.thumbnails.default.url} // URL de la miniatura
                    alt={video.snippet.title} // Titulo del video
                    className="w-16 h-12 object-cover rounded"
                  />
                  <button
                    onClick={() => setSelectedVideoId(video.id.videoId)}
                    className="flex-1 text-left text-sm font-semibold line-clamp-2 hover:underline"
                  >
                    {video.snippet.title}
                  </button>
                  <button
                    onClick={() => toggleFavorite(video)}
                    className="text-red-700 hover:underline"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              )
            )}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Principal;
