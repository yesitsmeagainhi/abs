// StickyButtons common component
export type StickyBtn = { icon: string; link: string; label: string };
export type StickyProps = {
  template : "stickyButtons";
  buttons  : StickyBtn[];
};

export default function StickyButtons({ buttons }: StickyProps) {
  if (!buttons?.length) return null;

  return (
    <nav className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
      {buttons.map((b, i) => (
        <a
          key={i}
          href={b.link}
          aria-label={b.label}
          className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.icon} alt="" className="h-6 w-6" aria-hidden />
        </a>
      ))}
    </nav>
  );
}
