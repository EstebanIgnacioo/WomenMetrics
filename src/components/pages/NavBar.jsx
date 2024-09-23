import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import '../../styles/NavBar.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-800 fixed w-full z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
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
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto hidden sm:block" // Oculta en móvil
            />
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch">
             {/* Imagen visible solo en móvil, oculta en escritorio */}
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          className="h-8 w-auto sm:hidden" // Oculta en escritorio
        />
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 justify-center">
                <a href="#" className="nav-link">Home</a>
                <a href="#" className="nav-link">Noticias</a>
                <a href="#" className="nav-link">Descargar</a>
                <a href="#" className="nav-link">Ayuda</a>
              </div>
            </div>
          </div>
          {/* Botón "Iniciar Sesión" visible solo en escritorio */}
          <div className="hidden sm:flex items-center">
            <button type="button" className="button-login">
              Iniciar Sesión
            </button>
          </div>
        </div>
       
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <DisclosureButton as="a" href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Home
          </DisclosureButton>
          <DisclosureButton as="a" href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Noticias
          </DisclosureButton>
          <DisclosureButton as="a" href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Descargar
          </DisclosureButton>
          <DisclosureButton as="a" href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Ayuda
          </DisclosureButton>
          <DisclosureButton as="button" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Iniciar Sesión
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
