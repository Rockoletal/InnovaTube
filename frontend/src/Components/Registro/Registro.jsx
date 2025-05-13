import React from 'react'
import fondo from "../../assets/fondo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPerson,
  faUser,
  faEnvelope,  
  faKey  
} from "@fortawesome/free-solid-svg-icons";
const Registro = () => {
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
                        <form className="w-full space-y-3">


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
                                    name="Nombre y Apellido"
                                    //value={}
                                    required
                                />
                            </div>
                            {/* Nombre de Usuario */}
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                                />
                                <input
                                    className="w-full px-12 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                    type="text"
                                    placeholder="Usuario"
                                    name="Usuario"
                                    //value={}
                                    //onChange={handleChange}
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
                                    //value={}
                                    //onChange={handleChange}
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
                                    //value={}
                                    //onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Comfirmar Contraseña */}
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faKey}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                                />
                                <input
                                    className="w-full px-12 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                    type="tel"
                                    placeholder="Comfirmar Contraseña"
                                    name="comfirmarcontrasena"
                                    //value={}
                                    
                                    required
                                />
                            </div>

                            {/* ReCapcha */}
                            <div className="relative">
                                <FontAwesomeIcon
                                    //icon={faPhone}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                                />
                                <input
                                    className="w-full px-12 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                    type="tel"
                                    placeholder="ReCaptcha"
                                    name="recaptcha"
                                    //value={}
                                    
                                    required
                                />
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
  )
}

export default Registro