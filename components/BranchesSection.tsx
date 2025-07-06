// components/BranchesSection.tsx - Pure Tailwind Version
import React from 'react';

type Branch = {
  name: string;
  location: string;
  map: string;
  phone: string;
  whatsapp: string;
};

type Props = { 
  branches?: Branch[]; 
  onConnect: (b: Branch) => void 
};

export default function BranchesSection({ branches = [], onConnect }: Props) {
  return (
    <section className="w-full py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 sm:mb-10">
          Visit our branches for free counselling
        </h2>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
            {branches.map((b, index) => (
              <div
                key={b.name}
                className="flex-shrink-0 w-72 border rounded-xl p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 overflow-hidden">
                      <span className="block truncate">{b.name}</span>
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed overflow-hidden line-clamp-3">
                      {b.location}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                      {index + 1}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-4 flex flex-col gap-3">
                  <a
                    href={b.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-slate-100 py-3 px-4 text-center hover:bg-slate-200 transition-colors font-medium text-sm flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <span>📍</span>
                    <span>Open in map</span>
                  </a>
                  <button
                    onClick={() => onConnect(b)}
                    className="rounded-lg border border-gray-300 py-3 px-4 text-center hover:bg-slate-50 transition-colors font-medium text-sm flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <span>📞</span>
                    <span>Connect with branch</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          {branches.length > 1 && (
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>←</span>
                <span>Swipe to see more branches</span>
                <span>→</span>
              </div>
            </div>
          )}
        </div>

        {/* Desktop/Tablet: Grid Layout */}
        <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((b, index) => (
            <div
              key={b.name}
              className="border rounded-xl p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow bg-white"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {b.name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {b.location}
                  </p>
                </div>
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-medium flex-shrink-0 ml-2">
                  {index + 1}
                </span>
              </div>

              <div className="mt-auto pt-4 flex flex-col gap-3">
                <a
                  href={b.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-slate-100 py-3 px-4 text-center hover:bg-slate-200 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <span>📍</span>
                  <span>Open in map</span>
                </a>
                <button
                  onClick={() => onConnect(b)}
                  className="rounded-lg border border-gray-300 py-3 px-4 text-center hover:bg-slate-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <span>📞</span>
                  <span>Connect with branch</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}