'use client';

import React from 'react';

// Importa las imágenes directamente
import ActivacionVoz from '../../assets/img/ActivacionVoz.png';
import MensajesPersonalizados from '../../assets/img/MensajePersonalizado.png';
import Contactos from '../../assets/img/Contactos.png';
import Autoridades from '../../assets/img/Autoridades.png';


const features = [
  {
    imgSrc: ActivacionVoz,
    title: 'Reconocimiento de Voz',
    subtitle: 'Activación mediante comandos de voz personalizados.',
    description: 'Activa la alerta personalizada mediante un comando de voz completamente personalizado, con esto mantendrás tu anonimato y te mantendrás a salvo.',
  },
  {
    imgSrc: MensajesPersonalizados,
    title: 'Mensajes Personalizados',
    subtitle: 'Envía mensajes adaptados a cada situación.',
    description: 'Tienes la oportunidad de crear mensajes completamente personalizados.',
  },
  {
    imgSrc: Contactos,
    title: 'Grupos de Contactos',
    subtitle: 'Organiza y gestiona tus contactos eficientemente.',
    description: 'Registra tus contactos y crea grupos de los mismos en donde puedas registrar tu circulo de confianza.',
  },
  {
    imgSrc: Autoridades,
    title: 'Derivación con autoridades',
    subtitle: 'Facilita el contacto con autoridades competentes.',
    description: 'Tienes la posibilidad de derivar todas tus alertas a las autoridades.',
  },
];

const FeaturesSection = () => {
  return (
    <div id='SobreLaApp' className="py-20 px-6 lg:px-8 bg-white"> {/* Fondo blanco */}

      {/* Encabezado principal */}
      <h1 className="text-5xl font-bold text-[#230f3b] text-center mb-4">Conoce Women's Security</h1>
      <p className="text-gray-600 text-lg text-center mb-4 w-1/2 mx-auto"> {/* Aumentar ancho aquí */}
        Una aplicación diseñada para brindarte seguridad y tranquilidad en todo momento. Con diversidad de características revolucionarias adaptadas a tu comodidad y seguridad.
      </p>
      <div className="border-t-4 border-pink-500 w-1/4 mx-auto mb-12 rounded-full opacity-70"></div> {/* Línea separadora rosada, más pequeña y redondeada */}

      <h2 className="text-3xl font-bold text-center mb-12">Características de la App</h2>
      <div className="space-y-16"> {/* Espacio entre secciones */}

        {/* Renderiza la versión para pantallas grandes */}
        <div className="hidden lg:flex flex-col space-y-16">
          {/*VOZ*/}
          <div className="flex items-center justify-start mx-40 mb-8"> {/* Aumentar margen aquí */}
            <img
              src={features[0].imgSrc}
              alt={`Feature 1`}
              className="w-64 h-64 object-cover rounded-lg mr-4" // Espacio entre imagen y texto
            />
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold text-[#230f3b] mb-1">{features[0].title}</h3> {/* Título más grande y color */}
              <p className="text-md text-gray-600 mb-1">{features[0].subtitle}</p>
              <p className="text-lg leading-7 text-gray-700 w-2/3">{features[0].description}</p>
            </div>
          </div>
          {/*MENSAJES*/}
          <div className="flex items-center justify-start mx-40 mb-8 flex-row-reverse">
            <img
              src={features[1].imgSrc}
              alt={`Feature 2`}
              className="w-64 h-64 object-cover rounded-lg mr-4" // Espacio entre imagen y texto
            />
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold text-[#230f3b] mb-1">{features[1].title}</h3> {/* Título más grande y color */}
              <p className="text-md text-gray-600 mb-1">{features[1].subtitle}</p>
              <p className="text-lg leading-7 text-gray-700 ">{features[1].description}</p>
            </div>
          </div>
          {/*CONTACTOS*/}
          <div className="flex items-center justify-start mx-40 mb-8"> {/* Aumentar margen aquí */}
            <img
              src={features[2].imgSrc}
              alt={`Feature 3`}
              className="w-64 h-64 object-cover rounded-lg mr-4" // Espacio entre imagen y texto
            />
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold text-[#230f3b] mb-1">{features[2].title}</h3> {/* Título más grande y color */}
              <p className="text-md text-gray-600 mb-1">{features[2].subtitle}</p>
              <p className="text-lg leading-7 text-gray-700 w-1/7">{features[2].description}</p>
            </div>
          </div>
          {/*AUTORIDADES*/}
          <div className="flex items-center justify-start mx-40 mb-8 flex-row-reverse">
            <img
              src={features[3].imgSrc}
              alt={`Feature 4`}
              className="w-64 h-64 object-cover rounded-lg mr-4" // Espacio entre imagen y texto
            />
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold text-[#230f3b] mb-1">{features[3].title}</h3> {/* Título más grande y color */}
              <p className="text-md text-gray-600 mb-1">{features[3].subtitle}</p>
              <p className="text-lg leading-7 text-gray-700 ">{features[3].description}</p>
            </div>
          </div>
        </div>

        {/* Renderiza la versión para pantallas pequeñas */}
        <div className="flex lg:hidden flex-col space-y-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center mx-8 mb-8"> {/* Aumentar margen aquí */}
              <img
                src={feature.imgSrc}
                alt={`Feature ${index + 1}`}
                className="w-64 h-64 object-cover rounded-lg mb-2" // Espacio entre imagen y texto
              />
              <h3 className="text-2xl font-semibold text-[#230f3b] mb-1">{feature.title}</h3> {/* Título más grande y color */}
              <p className="text-md text-gray-600 mb-1">{feature.subtitle}</p>
              <p className="text-lg leading-7 text-gray-700 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FeaturesSection;
