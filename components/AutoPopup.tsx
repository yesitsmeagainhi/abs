/* ──────────────────────────────────────────────────────────────
   AutoPopup
   • Shows exactly once per tab-session
   • Trigger A: 5 s after page load
   • Trigger B: first time user scrolls to bottom 15 %
   • Close = ESC, backdrop-click or the × icon
   • Uses Headless-UI + Heroicons (same deps as StickyEligibility)
   ──────────────────────────────────────────────────────────── */

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
  title?: string;
  children: React.ReactNode;       // content inside the modal
};

export default function AutoPopup({
  title = 'Need help choosing the right course?',
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  /* ─────────── Trigger logic ─────────── */
  useEffect(() => {
    // already shown this session?
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('abs-popup-shown')) return;

    // timer trigger
    const timer = setTimeout(() => setOpen(true), 5000);

    // scroll trigger
    const onScroll = () => {
      const scrolled =
        (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (scrolled > 0.85) {
        setOpen(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* ─── write flag once modal is closed/shown ─── */
  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem('abs-popup-shown', 'true');
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={handleClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        {/* Panel */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl relative">
              {/* close */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <Dialog.Title className="text-xl font-semibold mb-4 text-center">
                {title}
              </Dialog.Title>

              {children}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
