'use client'

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import '../../styles/Hero.css';
import Logo from '../../assets/img/Logo_2_white.png';

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white animate-gradient-move">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <div className="flex justify-center items-center">
              <img src={Logo} alt="Logo White" className="h-60 w-auto" />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-5xl text-white drop-shadow-lg">
              Women's Security
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200 drop-shadow-sm">
              Te invitamos a descargar Women's Security, una app diseñada para mantenerte segura con alertas rápidas usando reconocimiento de voz.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-y-2">
              <a
                href="/descargar"
                className="rounded-full bg-white px-5 py-3 text-sm font-bold text-indigo-600 shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
              >
                ¡Descargar!
              </a>
              <a href="/#SobreLaApp" className="text-sm font-semibold leading-6 text-white hover:text-indigo-300">
                Sobre la app <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
