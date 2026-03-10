import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function UnitGallery({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const allImages =
    images.length > 0
      ? images
      : ["https://placehold.co/800x500/1B3D6F/white?text=BeStay"];

  const prev = () =>
    setCurrent((c) => (c - 1 + allImages.length) % allImages.length);
  const next = () => setCurrent((c) => (c + 1) % allImages.length);

  return (
    <>
      {/* Main gallery */}
      <div className="grid grid-cols-4 gap-2 h-96 rounded-2xl overflow-hidden">
        {/* Main large image */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer group"
          onClick={() => setLightbox(true)}
        >
          <img
            src={allImages[0]}
            alt="Main"
            className="w-full h-full object-cover group-hover:brightness-90 transition-all"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-l-2xl" />
        </div>
        {/* Side images */}
        {allImages.slice(1, 5).map((img, i) => (
          <div
            key={i}
            className={`relative cursor-pointer group overflow-hidden ${
              i === 1 ? "rounded-tr-2xl" : i === 3 ? "rounded-br-2xl" : ""
            }`}
            onClick={() => {
              setCurrent(i + 1);
              setLightbox(true);
            }}
          >
            <img
              src={img}
              alt={`Photo ${i + 2}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Show all photos overlay on last tile */}
            {i === 3 && allImages.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-semibold">
                +{allImages.length - 5} more
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(false);
            }}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 text-white/70 hover:text-white"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <img
            src={allImages[current]}
            alt={`Photo ${current + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 text-white/70 hover:text-white"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          <div className="absolute bottom-4 text-white/60 text-sm">
            {current + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  );
}
