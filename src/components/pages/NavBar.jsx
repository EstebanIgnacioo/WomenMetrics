import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import '../../styles/NavBar.css';
import Logo from '../../assets/img/Logo_1_black.png';
import { Link, useLocation } from "react-router-dom";



export default function NavBar() {
  const location = useLocation(); // Usamos useLocation para obtener la ruta actual

  return (
    <Disclosure as="nav" className="bg-800 fixed w-full z-50 min-h-[4rem] shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between min-h-[4rem]">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex-shrink-0">
            {/* Imagen visible en escritorio y oculta en móvil */}
            <img
              alt="Your Company"
              src={Logo}
              className="h-12 w-auto hidden sm:block"
            />
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch">
            {/* Imagen visible solo en móvil, oculta en escritorio */}
            <img
              alt="Your Company"
              src={Logo}
              className="h-16 w-auto sm:hidden"
            />
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 justify-center">
                <a href="/" className="nav-link">Home</a>
                <a href="/noticias" className="nav-link">Noticias</a>
                <a href="/descargar" className="nav-link">Descargar</a>
                <a href="/ayuda" className="nav-link">Ayuda</a>
              </div>
            </div>
          </div>
          {/* Espacio fijo para el botón "Iniciar Sesión" */}
          <div className="hidden sm:flex items-center">
            {location.pathname !== "/inicio-sesion" ? (
              <Link to="/inicio-sesion" className="button-login">
                Iniciar Sesión
              </Link>
            ) : (
              <div className="w-[150px]" /> 
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <DisclosureButton as="a" href="/" className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white">
            Home
          </DisclosureButton>
          <DisclosureButton as="a" href="/noticias" className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white">
            Noticias
          </DisclosureButton>
          <DisclosureButton as="a" href="/descargar" className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white">
            Descargar
          </DisclosureButton>
          <DisclosureButton as="a" href="/ayuda" className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white">
            Ayuda
          </DisclosureButton>
          {/* Botón "Iniciar Sesión" en móvil también oculto si estamos en /inicio-sesion */}
          {location.pathname !== "/inicio-sesion" && (
            <DisclosureButton as="button" className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white">
              Iniciar Sesión
            </DisclosureButton>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
