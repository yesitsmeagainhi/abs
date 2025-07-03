// components/StickyButton.tsx

import { useState } from 'react';

const COUNSELLOR_PHONE  = '9702836946';  // Modify this to your phone number
const WHATSAPP_NUMBER   = '919702836946';  // Modify this to your WhatsApp number

export default function StickyButton() {
  const [modalOpen, setModalOpen] = useState(false);

  // Helper links for call and whatsapp
  const phoneHref = `tel:${COUNSELLOR_PHONE}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <>
      {/* Sticky Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="bg-green-600 text-white p-4 rounded-full shadow-md
                     hover:bg-green-700 focus:ring-2 focus:ring-green-300"
          onClick={() => setModalOpen(true)}
        >
          Connect with Admission Expert
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setModalOpen(false)}>
          <div className="bg-white w-full max-w-md rounded-2xl p-8 relative"
               onClick={e => e.stopPropagation()}>
            {/* Close Icon */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setModalOpen(false)}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4l12 12M16 4L4 16" />
              </svg>
            </button>

            <h4 className="text-xl font-semibold mb-6 text-center">Talk to an Expert</h4>
            <p className="text-center text-gray-600 mb-6">We're just a call or message away to assist you with your admission process.</p>

            {/* Buttons */}
            <div className="space-y-4">
              <a href={phoneHref} className="flex items-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-3 rounded-lg transition justify-center">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3c3 9 9 15 18 18l3-3-4-6-5 2c-2-1-5-4-6-6l2-5L5 0 2 3z"/>
                </svg>
                Call Now
              </a>

              <a href={whatsappHref} target="_blank" rel="noreferrer"
                 className="flex items-center gap-3 w-full border border-green-600 text-green-700 hover:bg-green-50 font-medium px-4 py-3 rounded-lg transition justify-center">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M16 0C7.164 0 0 7.163 0 16c0 2.82.733 5.463 2.017 7.788L0 32l8.4-2.182A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.771 23.771c-.373 1.044-2.16 1.97-2.976 2.096-.76.115-1.713.163-2.76-.175a24.57 24.57 0 0 1-2.556-1.12c-4.511-1.974-7.452-6.555-7.687-6.86-.235-.307-1.84-2.445-1.84-4.665 0-2.219 1.161-3.311 1.574-3.758.412-.447.898-.559 1.198-.559.3 0 .6.003.859.015.28.012.649-.105 1.017.777.374.898 1.274 3.116 1.387 3.344.112.228.186.496.037.803-.149.306-.224.495-.448.763-.224.267-.472.598-.673.803-.224.224-.457.468-.196.915.261.448 1.159 1.915 2.492 3.103 1.713 1.572 3.16 2.063 3.609 2.287.449.224.711.187.973-.112.261-.298 1.119-1.303 1.418-1.749.299-.447.598-.373.998-.224.374.15 2.366 1.118 2.767 1.322.374.19.623.286.711.448.087.162.087.934-.286 1.978z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
