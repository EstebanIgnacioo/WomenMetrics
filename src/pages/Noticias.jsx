import React from 'react';
import NavBar from '../components/pages/NavBar';
import Footer from '../components/pages/Footer';

const noticiasData = [
    {
        id: 1,
        title: 'Título de la noticia 1',
        description: 'Descripción breve de la noticia 1. Aquí puedes incluir más detalles.',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        title: 'Título de la noticia 2',
        description: 'Descripción breve de la noticia 2. Aquí puedes incluir más detalles.',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        title: 'Título de la noticia 3',
        description: 'Descripción breve de la noticia 3. Aquí puedes incluir más detalles.',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 4,
        title: 'Título de la noticia 4',
        description: 'Descripción breve de la noticia 4. Aquí puedes incluir más detalles.',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 5,
        title: 'Título de la noticia 5',
        description: 'Descripción breve de la noticia 5. Aquí puedes incluir más detalles.',
        imageUrl: 'https://via.placeholder.com/150',
    },
    // Agrega más noticias aquí
];

function Noticias() {
    return (
        <>
            <NavBar />
            <div className="bg-white min-h-screen p-6"> {/* Contenedor del fondo blanco */}
                <div className="mt-16 mb-10"> {/* Agregando margen superior e inferior */}
                    {/* Título de Noticias */}
                    <h1 className="text-4xl font-bold text-black text-center mb-4">Noticias</h1>
                    <p className="text-center text-gray-600 mb-2">Mantente informado con nuestras últimas noticias.</p>
                    <div className="border-t-4 border-pink-500 w-1/4 mx-auto mb-10 rounded-full opacity-70"></div> {/* Línea separadora rosada */}

                    <div className="grid grid-cols-1 gap-6">
                        {noticiasData.map(noticia => (
                            <div 
                                key={noticia.id} 
                                className="bg-[#230f3b] rounded-[1rem] shadow-md hover:shadow-xl p-6 w-[90%] md:w-[75%] mx-auto" // Ancho del 90% en móviles y 75% en escritorio
                            >
                                <div className="flex flex-col md:flex-row m-4"> {/* Flex para mobile y desktop */}
                                    <img 
                                        src={noticia.imageUrl} 
                                        alt={noticia.title} 
                                        className="w-full h-auto rounded-lg mb-4 md:mb-0 md:w-48 md:mr-4" // Imagen más grande en escritorio
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-xl font-semibold text-white">{noticia.title}</p> {/* Texto blanco */}
                                        <p className="text-gray-300 mt-2">{noticia.description}</p> {/* Texto gris claro */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Noticias;
