import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { getAudioPath, getImagePath } from "../utils/paths";

const Landing = ({ setActiveSection, setAudioPlaying }) => {
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const photoRefs = useRef([]);
  const [showPhotos, setShowPhotos] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  // Buat array foto - GUNAKAN getImagePath
  const photos = [
    {
      id: 1,
      alt: "Foto Kenangan 1",
      className: "w-24 h-24 top-10 left-10",
      src: getImagePath("imu1.jpeg"), // PERBAIKAN DI SINI
    },
    {
      id: 2,
      alt: "Foto Kenangan 2",
      className: "w-32 h-32 bottom-10 right-10",
      src: getImagePath("imu2.jpeg"), // PERBAIKAN DI SINI
    },
    {
      id: 3,
      alt: "Foto Kenangan 3",
      className: "w-20 h-20 top-1/2 right-20",
      src: getImagePath("imu3.jpeg"), // PERBAIKAN DI SINI
    },
    {
      id: 4,
      alt: "Foto Kenangan 4",
      className: "w-28 h-28 bottom-20 left-20",
      src: getImagePath("imu4.jpeg"), // PERBAIKAN DI SINI
    },
  ];

  // Initialize audio
  useEffect(() => {
    // Buat audio element
    audioRef.current = new Audio();

    // Coba beberapa sumber musik (fallback jika satu tidak ada)
    const musicSources = [
      getAudioPath("birthday-song.mp3"), // PERBAIKAN DI SINI
      getAudioPath("happy-birthday.mp3"), // PERBAIKAN DI SINI
      "https://assets.mixkit.co/music/preview/mixkit-happy-birthday-to-you-443.mp3",
      "https://assets.mixkit.co/music/preview/mixkit-balloons-party-481.mp3",
    ];

    // ... (kode lainnya tetap sama sampai setAudioSource)

    const setAudioSource = async () => {
      for (const src of musicSources) {
        try {
          const response = await fetch(src, { method: "HEAD" });
          if (response.ok) {
            audioRef.current.src = src;
            console.log("🎵 Audio source set to:", src);
            break;
          }
        } catch {
          console.log(`❌ Source not available: ${src}`);
          continue;
        }
      }

      // Jika semua gagal, gunakan online source
      if (!audioRef.current.src) {
        console.log("⚠️ No local audio found, using online source");
        audioRef.current.src =
          "https://assets.mixkit.co/music/preview/mixkit-happy-birthday-to-you-443.mp3";
      }

      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
      audioRef.current.preload = "auto";

      // Coba preload untuk cek error lebih awal
      audioRef.current.load();
    };

    setAudioSource();

    // ... (kode event listeners tetap sama)
  }, [setAudioPlaying]);

  // ... (kode selanjutnya tetap sama, TAPI perbaiki img tag error handling)

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* ... (background decorations tetap sama) */}

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* ... (header dan teks tetap sama) */}

        <div className="space-y-4">
          {/* ... (tombol dan audio indicator tetap sama) */}

          <button
            onClick={() => setActiveSection("gallery")}
            className="text-pink-600 hover:text-pink-700 font-medium underline decoration-dotted mt-4"
          >
            Lihat galeri foto kenangan kita →
          </button>
        </div>
      </div>

      {/* Animated photos - PERBAIKI ERROR HANDLING DI SINI */}
      {showPhotos && (
        <>
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={(el) => (photoRefs.current[index] = el)}
              className={`absolute photo-frame ${photo.className} animate-float`}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error(`❌ Error loading image: ${photo.src}`);
                  // Fallback ke Unsplash dengan pattern yang berbeda
                  e.target.src = `https://images.unsplash.com/photo-${
                    157 + index
                  }?w=400&h=400&fit=crop&auto=format`;

                  // Atau fallback ke local placeholder
                  // e.target.src = '/placeholder.jpg';

                  // Atau hide element
                  // e.target.style.display = 'none';
                }}
                onLoad={() => {
                  console.log(`✅ Image loaded: ${photo.src}`);
                }}
              />
            </div>
          ))}
        </>
      )}

      {/* Confetti canvas */}
      <canvas
        id="confetti-canvas"
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
};

export default Landing;
