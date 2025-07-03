// VideoBlock block component
export type VideoBlockProps = {
  template : "video";
  heading  : string;
  videoUrl : string;
};

export default function VideoBlock({ heading, videoUrl }: VideoBlockProps) {
  if (!videoUrl) return null;

  return (
    <section className="py-16 bg-slate-50">
      <h2 className="text-3xl font-bold text-center mb-8">{heading}</h2>

      <div className="max-w-5xl mx-auto px-4">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={videoUrl}
            title={heading}
            allowFullScreen
            className="rounded-2xl w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
