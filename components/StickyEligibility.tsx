/* ──────────────────────────────────────────────────────────────
   StickyEligibility
   • Sits at the bottom of every course or landing page
   • When tapped, opens a modal offering:
       1) “Request call-back”  → Netlify Form (Name + Phone)
       2) “Call now”           → tel: link
       3) “WhatsApp chat”      → pre-filled message
   ──────────────────────────────────────────────────────────── */

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhoneIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';

type Props = {
  courseName: string;
  tel?: string;               // default number if not provided
};

export default function StickyEligibility({ courseName, tel = '18005728309' }: Props) {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const whatsappMsg = encodeURIComponent(`Hi, I saw ${courseName} on your website. Please share more details.`);

  return (
    <>
      {/* ——— Sticky trigger button ——— */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 inset-x-0 mx-auto w-11/12 md:w-auto
                   px-6 py-3 rounded-full font-medium shadow-lg bg-green-600
                   text-white hover:bg-green-700 transition pointer-events-auto
                   flex items-center justify-center gap-2 z-40"
      >
        Check Your Eligibility&nbsp;•&nbsp;Talk with our expert counsellor
      </button>

      {/* ——— Modal wrapper (Headless-UI) ——— */}
      <Transition show={open} as={Fragment}>
        <Dialog onClose={() => { setOpen(false); setShowForm(false); }} className="relative z-50">
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

          {/* Modal */}
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
              <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl relative">
                {/* Close icon */}
                <button
                  onClick={() => { setOpen(false); setShowForm(false); }}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>

                {/* Modal content */}
                {!showForm ? (
                  <>
                    <Dialog.Title className="text-xl font-semibold mb-4 text-center">
                      Talk to a {courseName} counsellor
                    </Dialog.Title>

                    <div className="space-y-4">
                      {/* Call-back form trigger */}
                      <button
                        onClick={() => setShowForm(true)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white
                                   py-3 rounded-lg font-medium transition"
                      >
                        Request a call-back
                      </button>

                      {/* Call now */}
                      <a
                        href={`tel:${tel}`}
                        className="w-full flex items-center justify-center gap-2
                                   border border-gray-300 py-3 rounded-lg
                                   hover:bg-gray-50 transition"
                      >
                        <PhoneIcon className="w-5 h-5" />
                        Call now
                      </a>

                      {/* WhatsApp */}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://wa.me/91${tel.replace(/\D/g, '')}?text=${whatsappMsg}`}
                        className="w-full flex items-center justify-center gap-2
                                   border border-green-500 text-green-600 py-3 rounded-lg
                                   hover:bg-green-50 transition"
                      >
                        <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </>
                ) : (
                  /* ——— Netlify form ——— */
                  <>
                    <Dialog.Title className="text-xl font-semibold mb-4 text-center">
                      Request a call-back
                    </Dialog.Title>

                    <form
                      name="course-eligibility"
                      method="POST"
                      data-netlify="true"
                      netlify-honeypot="bot-field"
                      className="space-y-4"
                    >
                      <input type="hidden" name="form-name" value="course-eligibility" />
                      <input type="hidden" name="course" value={courseName} />
                      <input type="hidden" name="bot-field" />

                      <div>
                        <label className="sr-only" htmlFor="name">Name</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2
                                     focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="sr-only" htmlFor="phone">Phone</label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          pattern="[0-9]{10}"
                          required
                          placeholder="10-digit mobile number"
                          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2
                                     focus:ring-indigo-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white
                                   py-3 rounded-lg font-medium transition"
                      >
                        Submit
                      </button>
                    </form>
                  </>
                )}
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
