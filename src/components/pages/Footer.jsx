import React from 'react';
import Logo from '../../assets/img/Logo_5_white.png';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      {/* Imagen y separador blanco */}
      <div className="flex flex-col items-center mb-6">
        <img src={Logo} alt="Logo" className="w-24 h-auto object-contain mb-1" /> {/* Menos margen inferior */}
      </div>

      {/* Segundo separador blanco */}
      <div className="w-full h-0.5 bg-white mb-6"></div> {/* Separador blanco */}

      {/* Texto pequeño centrado abajo */}
      <div className="text-center text-sm mt-6">
        <p>© 2024 Women's Security. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
