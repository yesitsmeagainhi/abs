// components/MobileBottomBar.tsx
// Sticky bottom bar for mobile – Call, WhatsApp, Apply Free

type Props = {
  phone?: string;
  whatsapp?: string;
  applyLink?: string;
};

export default function MobileBottomBar({
  phone = '9702836946',
  whatsapp = 'https://wa.me/919702836946?text=Hi%20I%20want%20details%20about%20admission%20process',
  applyLink = 'https://wa.link/q7f34m',
}: Props) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-3 divide-x divide-gray-200">
        {/* Call */}
        <a
          href={`tel:${phone}`}
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-green-600 active:bg-green-50 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-[11px] font-medium leading-tight">Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-green-600 active:bg-green-50 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M16 0C7.164 0 0 7.163 0 16c0 2.82.733 5.463 2.017 7.788L0 32l8.4-2.182A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.771 23.771c-.373 1.044-2.16 1.97-2.976 2.096-.76.115-1.713.163-2.76-.175a24.57 24.57 0 0 1-2.556-1.12c-4.511-1.974-7.452-6.555-7.687-6.86-.235-.307-1.84-2.445-1.84-4.665 0-2.219 1.161-3.311 1.574-3.758.412-.447.898-.559 1.198-.559.3 0 .6.003.859.015.28.012.649-.105 1.017.777.374.898 1.274 3.116 1.387 3.344.112.228.186.496.037.803-.149.306-.224.495-.448.763-.224.267-.472.598-.673.803-.224.224-.457.468-.196.915.261.448 1.159 1.915 2.492 3.103 1.713 1.572 3.16 2.063 3.609 2.287.449.224.711.187.973-.112.261-.298 1.119-1.303 1.418-1.749.299-.447.598-.373.998-.224.374.15 2.366 1.118 2.767 1.322.374.19.623.286.711.448.087.162.087.934-.286 1.978z" />
          </svg>
          <span className="text-[11px] font-medium leading-tight">WhatsApp</span>
        </a>

        {/* Apply Free */}
        <a
          href="/#apply-form"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 bg-orange-500 text-white active:bg-orange-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
          </svg>
          <span className="text-[11px] font-semibold leading-tight">Apply Free</span>
        </a>
      </div>
    </div>
  );
}
