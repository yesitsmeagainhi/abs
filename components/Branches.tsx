// components/Branches.tsx
import { MapPin, Phone, Info, MessageCircle, Clock } from 'lucide-react';
import { FC } from 'react';

type Branch = {
  id: number;
  name: string;
  locality: string;
  img: string;          // /public/uploads/…  (kept for later use if needed)
  mapUrl: string;       // Google-Maps link
  aboutUrl: string;     // internal slug     → /branches/…
  contactUrl: string;   // tel:
  whatsappUrl: string;  // WhatsApp link
};

const branches: Branch[] = [
  {
    id: 1,
    name: 'Bhayandar',
    locality:
      'MINI MARKET BUILDING, 104-106, BP Rd, Bhayandar East, Mumbai, Mira Bhayandar, Maharashtra 401105',
    img: '/uploads/location.png',
    mapUrl:
      'https://www.google.com/search?q=ABS+Educational+Solutions+Bhayandar&stick=H4sIAAAAAAAA_-NgU1I1qDBOSjVPMrSwSDU3NExJMU6zMqiwSLYwNzQzMzU2MEk0NE0zXsSq7OgUrOCaUpqcWJKZn5eYoxCcn1MKYhYrOGUkVibmpSQWAQBy5PlZTwAAAA&hl=en',
    aboutUrl: '/Bhayandar',
    contactUrl: 'tel:+919702836946',
    whatsappUrl:
      'https://wa.me/919702836946?text=I%20want%20to%20visit%20Bhayandar%20branch',
  },
  {
    id: 2,
    name: 'Thane',
    locality:
      'Abs Educational Solution, Rajdarshan Apartment, A-102, opp. platform 1, Naupada, Thane West, Thane 400602',
    img: '/uploads/location.png',
    mapUrl: 'https://g.co/kgs/L7GM4XU',
    aboutUrl: '/Thane',
    contactUrl: 'tel:+919702836946',
    whatsappUrl:
      'https://wa.me/919702836946?text=I%20want%20to%20visit%20Thane%20branch',
  },
  {
    id: 3,
    name: 'Nalasopara',
    locality:
      'Sai Vibhuti Apartment, B-403, above Maurya Dairy, Nalasopara East, Maharashtra 401209',
    img: '/uploads/location.png',
    mapUrl: 'https://g.co/kgs/bjkwwJZ',
    aboutUrl: '/Nalasopara',
    contactUrl: 'tel:+919702836946',
    whatsappUrl:
      'https://wa.me/919702836946?text=I%20want%20to%20visit%20Nalasopara%20branch',
  },
  {
    id: 4,
    name: 'Andheri',
    locality:
      'B-503/504 Vertex Vikas, Andheri East, Mumbai, Maharashtra 400069',
    img: '/uploads/location.png',
    mapUrl: 'https://g.co/kgs/pKPgxv1',
    aboutUrl: '/Andheri',
    contactUrl: 'tel:+919702836946',
    whatsappUrl:
      'https://wa.me/919702836946?text=I%20want%20to%20visit%20Andheri%20branch',
  },
  {
    id: 5,
    name: 'Malad',
    locality:
      'Office No. 5, 1st floor, Ayambil Bhavan, Manchubhai Rd, Malad East, Mumbai 400097',
    img: '/uploads/location.png',
    mapUrl: 'https://g.co/kgs/R4Yfhgg',
    aboutUrl: '/Malad',
    contactUrl: 'tel:+919702836946',
    whatsappUrl:
      'https://wa.me/919702836946?text=I%20want%20to%20visit%20Malad%20branch',
  },
  {
    id: 6,
    name: 'Kurla',
    locality:
      '2nd Floor, Kurla (W) Sta Rd, opposite Yogesh Footwear, Mumbai 400070',
    img: '/uploads/location.png',
    mapUrl: 'https://g.co/kgs/3nA5AeV',
    aboutUrl: '/Kurla',
    contactUrl: 'tel:+919702836946',
    whatsappUrl:
      'https://wa.me/919702836946?text=I%20want%20to%20visit%20Kurla%20branch',
  },
];

const Branches: FC = () => (
  <section id="branches" className="px-4 bg-gray-50 mt-6 md:mt-32">
    <div className="mx-auto max-w-7xl py-8">
      <h2 className="text-center font-bold text-4xl md:text-5xl mb-12 text-gray-900">
        Our Mumbai Branches
      </h2>

      {/* ────────── Mobile (horizontal scroll) ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 md:hidden">
        <div className="col-span-full overflow-x-auto">
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {branches.map((branch) => (
              <article
                key={branch.id}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group flex-shrink-0"
                style={{ width: 320 }}
              >
                {/* Header */}
                <header className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold">
                    Branch {branch.id}
                  </span>
                </header>

                {/* Info */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-gray-900">
                      {branch.name}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Mumbai
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    ABS Educational Solutions
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 font-medium">
                      10 AM – 7 PM
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {branch.locality}
                  </p>
                </div>

                {/* Footer */}
                <footer className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <nav className="flex items-center gap-3">
                    <a
                      href={branch.aboutUrl}
                      className="text-gray-600 hover:text-gray-900"
                      title="Learn more"
                    >
                      <Info className="w-5 h-5" />
                    </a>
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                      title="View location"
                    >
                      <MapPin className="w-5 h-5" />
                    </a>
                    <a
                      href={branch.contactUrl}
                      className="text-gray-600 hover:text-gray-900"
                      title="Call branch"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                    <a
                      href={branch.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 hover:text-green-700"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </nav>
                  <button
                    onClick={() => window.open(branch.mapUrl, '_blank')}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    Visit
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ────────── Desktop (6-col grid) ────────── */}
      <div className="hidden md:grid md:grid-cols-6 gap-6">
        {branches.map((branch) => (
          <article
            key={branch.id}
            className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
          >
            {/* Header */}
            <header className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">
                Branch {branch.id}
              </span>
            </header>

            {/* Info */}
            <div className="mb-3">
              <h3 className="font-bold text-sm text-gray-900 mb-1">
                {branch.name}
              </h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-2 inline-block">
                Mumbai
              </span>
              <h4 className="font-semibold text-xs text-gray-800 mb-2">
                ABS Educational Solutions
              </h4>
              <div className="flex items-center gap-1 mb-2">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-600 font-medium">
                  10 AM – 7 PM
                </span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {branch.locality}
              </p>
            </div>

            {/* Footer */}
            <footer className="pt-3 border-t border-gray-100">
              <nav className="flex items-center gap-2 mb-2">
                <a
                  href={branch.aboutUrl}
                  className="text-gray-600 hover:text-gray-900"
                  title="Learn more"
                >
                  <Info className="w-4 h-4" />
                </a>
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                  title="View location"
                >
                  <MapPin className="w-4 h-4" />
                </a>
                <a
                  href={branch.contactUrl}
                  className="text-gray-600 hover:text-gray-900"
                  title="Call branch"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={branch.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600 hover:text-green-700"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </nav>
              <button
                onClick={() => window.open(branch.mapUrl, '_blank')}
                className="bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium w-full"
              >
                Visit Branch
              </button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Branches;
