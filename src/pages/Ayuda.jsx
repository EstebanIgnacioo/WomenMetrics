import React from 'react';
import NavBar from '../components/pages/NavBar';
import Footer from '../components/pages/Footer';
import HelpImage from './../assets/img/helpimg.png'; // Asegúrate de que la ruta sea correcta

function Ayuda() {
    return (
        <>
            <NavBar />

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-16"> {/* Ajustado el pt a 16 para reducir el margen superior */}
                {/* Imagen en grande */}
                <img src={HelpImage} alt="Help" className="w-full h-auto max-w-md mb-6" /> {/* Imagen más pequeña */}

                {/* Título */}
                <h1 className="text-4xl font-bold text-center mb-4 text-black">Ayuda</h1> {/* Título en negro */}

                <div className="border-t-4 border-pink-500 w-1/4 mx-auto mb-10 rounded-full opacity-70"></div>

                {/* Texto de ayuda */}
                <p className="text-lg text-black text-center px-4"> {/* Texto en negro */}
                    Estamos aquí para ayudarte. Si tienes alguna pregunta o necesitas asistencia, no dudes en
                    ponerte en contacto con nosotros. Puedes escribirnos a{' '}
                    <a href="mailto:soporte@tuempresa.com" className="text-blue-500 hover:underline">
                        womenssecurity@gmail.com
                    </a>.
                </p>
            </div>

            <Footer />
        </>
    );
}

export default Ayuda;
