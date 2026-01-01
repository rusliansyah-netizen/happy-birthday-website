import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { getImagePath } from "../utils/paths";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [loading, setLoading] = useState(true);
  const galleryRef = useRef(null);

  // List semua ekstensi gambar yang didukung
  const possibleExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".JPG",
    ".JPEG",
    ".PNG",
    ".WEBP",
    ".GIF",
  ];

  // Data foto dasar
  const basePhotos = [
    {
      id: 1,
      baseName: "photo1",
      caption: "Momen pertama kita bersama ❤️",
      special: true,
    },
    {
      id: 2,
      baseName: "photo2",
      caption: "Tersenyum bersama dalam kebahagiaan",
      special: false,
    },
    {
      id: 3,
      baseName: "photo3",
      caption: "Petualangan indah kita",
      special: true,
    },
    {
      id: 4,
      baseName: "photo4",
      caption: "Kenangan yang takkan terlupakan",
      special: false,
    },
    {
      id: 5,
      baseName: "photo5",
      caption: "Kebersamaan paling berarti",
      special: true,
    },
  ];

  // Fallback URLs jika foto tidak ditemukan
  const fallbackUrls = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop&auto=format&q=80",
  ];

  const [photos, setPhotos] = useState([]);

  // Function untuk check apakah image bisa diload
  const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ exists: true });
      img.onerror = () => resolve({ exists: false });
      img.src = url;
    });
  };

  // Function untuk mencari file dengan berbagai ekstensi
  const findImageFile = async (baseName) => {
    for (const ext of possibleExtensions) {
      const testUrl = `/images/${baseName}${ext}`;
      const result = await checkImageExists(testUrl);
      if (result.exists) {
        return {
          url: testUrl,
          extension: ext,
        };
      }
    }
    return null;
  };

  // Load semua gambar
  useEffect(() => {
    const loadAllImages = async () => {
      setLoading(true);
      const loadedPhotos = [];

      for (let i = 0; i < basePhotos.length; i++) {
        const basePhoto = basePhotos[i];

        // Cari file lokal
        const localFile = await findImageFile(basePhoto.baseName);

        if (localFile) {
          // Gunakan file lokal
          loadedPhotos.push({
            id: basePhoto.id,
            url: localFile.url,
            caption: basePhoto.caption,
            special: basePhoto.special,
            isLocal: true,
          });
        } else {
          // Gunakan fallback
          loadedPhotos.push({
            id: basePhoto.id,
            url: fallbackUrls[i],
            caption: basePhoto.caption,
            special: basePhoto.special,
            isLocal: false,
          });
        }
      }

      setPhotos(loadedPhotos);
      setLoading(false);

      // Animasi masuk
      gsap.from(galleryRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });
    };

    loadAllImages();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    let interval;
    if (autoPlay && photos.length > 0) {
      interval = setInterval(() => {
        goToNext();
      }, 4000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, currentIndex, photos.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    if (photos.length > 0 && photos[currentIndex]?.special) {
      triggerConfetti();
    }
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    if (photos.length > 0 && photos[currentIndex]?.special) {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 },
    });

    gsap.to(".heart-icon", {
      scale: 1.5,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    if (photos[index]?.special) {
      triggerConfetti();
    }
  };

  // Animasi untuk foto aktif
  useEffect(() => {
    if (photos.length > 0) {
      const photoElement = document.querySelector(".active-photo");
      if (photoElement) {
        gsap.fromTo(
          photoElement,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
        );
      }
    }
  }, [currentIndex, photos]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">📸</div>
          <p className="text-xl font-medium text-gray-700 mb-4">
            Memuat Galeri Foto...
          </p>
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div ref={galleryRef} className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          📸 Galeri Kenangan Kita
        </h2>
        <p className="text-gray-600 text-lg">Kenangan indah kita bersama</p>
      </div>

      {/* Main Slideshow */}
      <div
        className="relative mb-8"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        <div className="photo-frame w-full max-w-4xl h-[500px] mx-auto relative overflow-hidden rounded-2xl">
          {photos[currentIndex] && (
            <>
              <img
                key={currentIndex}
                src={
                  photos[currentIndex]?.url || photos[currentIndex]?.fallbackUrl
                }
                alt={`Foto ${currentIndex + 1}`}
                className="active-photo w-full h-full object-cover"
                onError={(e) => {
                  if (photos[currentIndex]?.isLocal) {
                    e.target.src = fallbackUrls[currentIndex];
                  }
                }}
              />

              {/* Overlay caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center space-x-3 text-white">
                  <span
                    className={`text-2xl ${
                      photos[currentIndex].special
                        ? "text-pink-400 heart-icon"
                        : "text-white"
                    }`}
                  >
                    {photos[currentIndex].special ? "❤️" : "📷"}
                  </span>
                  <p className="text-xl font-medium">
                    {photos[currentIndex].caption}
                  </p>
                </div>
              </div>

              {photos[currentIndex].special && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  <span className="mr-2">✨</span>
                  Special Moment!
                </div>
              )}
            </>
          )}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-xl transition-all hover:scale-110"
          aria-label="Foto sebelumnya"
        >
          <span className="text-2xl">⬅️</span>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-xl transition-all hover:scale-110"
          aria-label="Foto berikutnya"
        >
          <span className="text-2xl">➡️</span>
        </button>

        {/* Auto-play toggle */}
        <div className="absolute top-4 left-4">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg transition-all ${
              autoPlay
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700"
            }`}
          >
            <span className="mr-2">{autoPlay ? "▶️" : "⏸️"}</span>
            {autoPlay ? "Auto" : "Pause"}
          </button>
        </div>
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => handleThumbnailClick(index)}
            className={`relative group overflow-hidden h-32 transition-all duration-300 rounded-xl ${
              currentIndex === index
                ? "ring-4 ring-pink-500 ring-offset-2 transform scale-105 shadow-2xl"
                : "opacity-90 hover:opacity-100 hover:scale-105 hover:shadow-xl"
            }`}
            aria-label={`Lihat foto ${index + 1}`}
          >
            <div className="relative w-full h-full">
              <img
                src={photo.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (photo.isLocal) {
                    e.target.src = fallbackUrls[index];
                  }
                }}
              />

              {/* Overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 left-2 right-2 text-white text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Foto {index + 1}</span>
                    {photo.special && <span className="text-pink-300">❤️</span>}
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Photo counter & controls */}
      <div className="text-center mb-12">
        <div className="inline-flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">
              Foto {currentIndex + 1} dari {photos.length}
            </span>
            <div className="flex space-x-1">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-pink-500 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ke foto ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Special message jika semua foto adalah asli */}
      {photos.filter((p) => p.isLocal).length === photos.length && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-4 rounded-2xl">
            <span className="text-2xl mr-3">🎉</span>
            <div className="text-left">
              <p className="font-bold text-gray-800">
                Semua foto adalah kenangan asli kita!
              </p>
              <p className="text-sm text-gray-600">
                Setiap gambar adalah momen spesial bersama ❤️
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
