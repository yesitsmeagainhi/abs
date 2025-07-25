// components/Branches.tsx
import Image from 'next/image';
import { MapPin, Phone, Info, MessageCircle, Clock } from 'lucide-react';

type Branch = {
  id: number;
  name: string;
  locality: string;
  img: string;          // /public/uploads/…
  mapUrl: string;       // Google-Maps link
  aboutUrl: string;     // internal slug --> /branches/…
  contactUrl: string;   // tel: / whatsapp:
  whatsappUrl: string;  // whatsapp link
};

const branches: Branch[] = [
  {
    id: 1,
    name: 'Bhayandar',
    locality: 'MINI MARKET BUILDING, 104-106, BP Rd, Bhayandar East, Mumbai, Mira Bhayandar, Maharashtra 401105',
    img: '/uploads/location.png',
    mapUrl: 'https://www.google.com/search?q=ABS+Educational+Solutions+Bhayandar&stick=H4sIAAAAAAAA_-NgU1I1qDBOSjVPMrSwSDU3NExJMU6zMqiwSLYwNzQzMzU2MEk0NE0zXsSq7OgUrOCaUpqcWJKZn5eYoxCcn1MKYhYrOGUkVibmpSQWAQBy5PlZTwAAAA&hl=en&mat=CQmXH4nIfbrvElcBYJahaX8Qeif8Qoe_XWrw6nKJc2V-UowPIipgYiMfNIodWP_UkYlIPObS-8YX6qjj6VTmjNhJjoacb_Bvsg6oigJPR7OZfToqNq-NAwDe0HHeSC72V84&authuser=0',
    aboutUrl: '/Bhayandar',
    contactUrl: 'tel:+919702836946',
    whatsappUrl: 'https://wa.me/919702836946?text=I%20want%20to%20visit%20Bhayandar%20branch',
  },
  {
    id: 2,
    name: 'Thane',
    locality: 'Abs Educational Solution, Rajdarshan Apartment, A-102, opp. platform no 1, Dada Patil Wadi, Naupada, Thane West, Thane, Maharashtra 400602',
    img: '/uploads/location.png',
    mapUrl: 'https://g.co/kgs/L7GM4XU',
    aboutUrl: '/Thane',
    contactUrl: 'tel:+919702836946',
    whatsappUrl: 'https://wa.me/919702836946?text=I%20want%20to%20visit%20Thane%20branch',
  },
  {
    id: 3,
    name: 'Nalasopara',
    locality: 'Sai Vibhuti Apartment, B-403, above Maurya Dairy, Dube Estate, Moregaon Talao, Nalasopara East, Nala Sopara, Maharashtra 401209',
    img: '/uploads/location.png',
    mapUrl: 'https://g.co/kgs/bjkwwJZ',
    aboutUrl: '/Nalasopara',
    contactUrl: 'tel:+919702836946',
    whatsappUrl: 'https://wa.me/919702836946?text=I%20want%20to%20visit%20Nalasopara%20branch',
  },
  {
    id: 4,
    name: 'Andheri',
    locality: ' B-503/504 Vertex Vikas, B-Wing, Andheri East, Andheri, Maharashtra 400069',
    img: '/uploads/location.png',
    mapUrl: 'https://g.co/kgs/pKPgxv1',
    aboutUrl: '/Andheri',
    contactUrl: 'tel:+919702836946',
    whatsappUrl: 'https://wa.me/919702836946?text=I%20want%20to%20visit%20Andheri%20branch',
  },
  {
    id: 5,
    name: 'Malad',
    locality: 'Office No.5, 1st floor, Ayambil Bhavan, Manchubhai Rd, above Indian Handloom, opp. Surabhi Sweets, Malad, Malad East, Mumbai, Maharashtra 400097',
    img: '/uploads/location.png',
    mapUrl: 'https://g.co/kgs/R4Yfhgg',
    aboutUrl: '/Malad',
    contactUrl: 'tel:+919702836946',
    whatsappUrl: 'https://wa.me/919702836946?text=I%20want%20to%20visit%20Malad%20branch',
  },
  {
    id: 6,
    name: 'Kurla',
    locality: '2nd Floor, Kurla W Sta Rd, next to rammahal hotel modern diary, opp. yogesh foot wear, Brahmanwadi, Kurla, Mumbai, Maharashtra 400070',
    img: '/uploads/location.png',
    mapUrl: 'https://g.co/kgs/3nA5AeV',
    aboutUrl: '/Kurla',
    contactUrl: 'tel:+919702836946',
    whatsappUrl: 'https://wa.me/919702836946?text=I%20want%20to%20visit%20Kurla%20branch',
  },
];

export default function Branches() {
  return (
<<<<<<< HEAD
    <section id="branches" className="mt-6 px-4 bg-gray-50">
=======
    <section id="branches" className="mt-32 px-4 bg-gray-50">
>>>>>>> 8571d6c2dd6a3183764239a65589ac7c9ed104db
      <div className="mx-auto max-w-7xl py-8">
        <h2 className="text-center font-bold text-4xl md:text-5xl mb-12 text-gray-900">
          Our Mumbai Branches
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 md:hidden">
          {/* Mobile scrollable view */}
          <div className="col-span-full overflow-x-auto">
            <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group flex-shrink-0"
                  style={{ width: '320px' }}
                >
                  {/* Header with logo and branch number */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold">
                      Branch {branch.id}
                    </div>
                  </div>

                  {/* Branch info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg text-gray-900">{branch.name}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        Mumbai
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      ABS Educational Solutions
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 font-medium">10:00 AM - 7:00 PM</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {branch.locality}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      10 AM - 7 PM
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <a
                        href={branch.aboutUrl}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        title="Learn more"
                      >
                        <Info className="w-5 h-5" />
                      </a>
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        title="View location"
                      >
                        <MapPin className="w-5 h-5" />
                      </a>
                      <a
                        href={branch.contactUrl}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        title="Call branch"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                      <a
                        href={branch.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 hover:text-green-700 transition-colors"
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </a>
                    </div>
                    <button 
                      onClick={() => window.open(branch.mapUrl, '_blank')}
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
                    >
                      Visit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop grid view - 6 in a row */}
        <div className="hidden md:grid md:grid-cols-6 gap-6">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
            >
              {/* Header with logo and branch number */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">
                  Branch {branch.id}
                </div>
              </div>

              {/* Branch info */}
              <div className="mb-3">
                <div className="flex items-center gap-1 mb-1">
                  <h3 className="font-bold text-sm text-gray-900">{branch.name}</h3>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full block w-fit mb-2">
                  Mumbai
                </span>
                <h4 className="font-semibold text-xs text-gray-800 mb-2">
                  ABS Educational Solutions
                </h4>
                <div className="flex items-center gap-1 mb-2">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600 font-medium">10 AM - 7 PM</span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {branch.locality}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <Clock className="w-2 h-2" />
                  10 AM - 7 PM
                </span>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={branch.aboutUrl}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      title="Learn more"
                    >
                      <Info className="w-4 h-4" />
                    </a>
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      title="View location"
                    >
                      <MapPin className="w-4 h-4" />
                    </a>
                    <a
                      href={branch.contactUrl}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      title="Call branch"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href={branch.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 hover:text-green-700 transition-colors"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <button 
                  onClick={() => window.open(branch.mapUrl, '_blank')}
                  className="bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors font-medium text-xs w-full"
                >
                  Visit Branch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}