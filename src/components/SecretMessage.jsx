import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const SecretMessage = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [typedText, setTypedText] = useState("");
  const messageRef = useRef(null);
  const containerRef = useRef(null);

  const fullMessage = `Untuk Sayangku Dewi Saskia Juanita,

Selamat ulang tahun! Hari ini adalah hari spesial karena dunia mendapatkan seseorang yang luar biasa seperti kamu.

Setiap momen bersamamu adalah berkah. Senyummu menerangi hariku, tawamu adalah musik terindah, dan cintamu adalah hadiah terbesar yang pernah kuterima.

Di hari spesialmu ini, aku berdoa agar semua impian dan harapanmu terkabul. Semoga kamu selalu dikelilingi kebahagiaan, kesehatan, dan cinta.

Terima kasih sudah menjadi bagian dari hidupku. Aku bersyukur setiap hari karena memilikimu.

Selamat ulang tahun sekali lagi! Semoga tahun ini membawa lebih banyak kebahagiaan, petualangan, dan cinta untuk kita berdua.

Selamanya milikmu,
[limud] ❤️`;

  useEffect(() => {
    // Animasi masuk dengan opacity penuh
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "all", // Clear any inline styles
      }
    );
  }, []);

  const handleUnlock = () => {
    if (!isUnlocked) {
      // Animasi unlock dengan brightness normal
      gsap.to(".lock-icon", {
        rotation: 360,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          setIsUnlocked(true);
          setTimeout(() => {
            setShowMessage(true);
            startTypewriter();
          }, 500);
        },
      });

      // Efek sparkle dengan opacity normal
      gsap.fromTo(
        ".sparkle",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );
    }
  };

  const startTypewriter = () => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullMessage.length) {
        setTypedText(fullMessage.substring(0, currentIndex));
        currentIndex++;

        // Scroll ke bawah secara otomatis
        if (messageRef.current) {
          messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
      } else {
        clearInterval(typingInterval);
      }
    }, 30);
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setShowMessage(false);
    setTypedText("");
  };

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto opacity-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          💌 Pesan Rahasia
        </h2>
        <p className="text-gray-600">Hanya untuk kamu yang spesial</p>
      </div>

      <div className="relative">
        {/* Background dengan opacity normal */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/80 to-purple-100/80 rounded-3xl -z-10"></div>

        {/* Lock/unlock section */}
        <div
          className={`text-center p-8 transition-all duration-500 ${
            isUnlocked
              ? "opacity-0 scale-95 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          <div className="relative inline-block">
            <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center shadow-2xl border-4 border-white">
              {isUnlocked ? (
                <span className="text-6xl lock-icon">🔓</span>
              ) : (
                <span className="text-6xl lock-icon">🔒</span>
              )}
            </div>

            {/* Sparkles */}
            <span className="absolute top-0 left-0 w-8 h-8 text-yellow-500 sparkle">
              ✨
            </span>
            <span className="absolute top-0 right-0 w-8 h-8 text-yellow-500 sparkle">
              ✨
            </span>
            <span className="absolute bottom-0 left-10 w-8 h-8 text-yellow-500 sparkle">
              ✨
            </span>
            <span className="absolute bottom-0 right-10 w-8 h-8 text-yellow-500 sparkle">
              ✨
            </span>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {isUnlocked ? "Pesan Terbuka!" : "Kunci Pesan Rahasia"}
          </h3>

          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {isUnlocked
              ? "Pesan khusus telah terbuka untukmu!"
              : "Klik tombol di bawah untuk membuka pesan rahasia dari hati ❤️"}
          </p>

          <button
            onClick={isUnlocked ? handleLock : handleUnlock}
            className={`btn-primary flex items-center justify-center space-x-2 mx-auto ${
              isUnlocked ? "bg-gradient-to-r from-green-500 to-emerald-500" : ""
            }`}
          >
            {isUnlocked ? (
              <>
                <span className="text-xl">🔒</span>
                <span>Kunci Kembali</span>
              </>
            ) : (
              <>
                <span className="text-xl">🔓</span>
                <span>Buka Pesan Rahasia</span>
              </>
            )}
          </button>
        </div>

        {/* Message section - Perbaikan utama di sini */}
        <div
          className={`transition-all duration-500 ${
            showMessage
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 absolute"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border-2 border-pink-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                  <span className="text-2xl text-white">❤️</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">
                    Pesan Dari Hati
                  </h4>
                  <p className="text-sm text-gray-600">Hanya untukmu</p>
                </div>
              </div>

              <button
                onClick={handleLock}
                className="p-2 hover:bg-pink-50 rounded-full transition-colors"
                title="Kunci pesan"
              >
                <span className="text-xl">🔒</span>
              </button>
            </div>

            {/* Container pesan dengan background solid */}
            <div
              ref={messageRef}
              className="h-96 overflow-y-auto p-6 bg-gradient-to-b from-white to-pink-50/80 rounded-2xl border-2 border-pink-100 shadow-inner"
            >
              <div className="font-comic text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
                {typedText}
                <span className="typewriter-text inline-block w-0 ml-1">|</span>
              </div>
            </div>

            {/* Status bar dengan opacity normal */}
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="text-pink-500">❤️</span>
                <span>Pesan ini dikunci dengan cinta</span>
              </div>
              <div className="text-right">
                <div className="text-pink-600 font-medium">
                  {typedText.length} / {fullMessage.length} karakter
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center mt-6 space-x-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Instructions dengan background solid */}
      <div className="text-center mt-8 p-4 bg-gradient-to-r from-white to-pink-50 rounded-2xl max-w-lg mx-auto border border-pink-100">
        <p className="text-gray-700 font-medium">
          <span className="text-pink-500 mr-2">💡</span>
          Pesan ini akan diketik otomatis setelah dibuka. Kamu bisa mengunci
          kembali kapan saja untuk membaca ulang dari awal.
        </p>
      </div>

      {/* Love meter */}
      <div className="mt-6">
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Meter Cinta 💖</span>
            <span className="text-pink-600 font-bold">100%</span>
          </div>
          <div className="h-3 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              style={{
                width: `${(typedText.length / fullMessage.length) * 100}%`,
              }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1 text-center">
            Progress membaca pesan cinta
          </div>
        </div>
      </div>

      {/* Photo memory (optional) */}
      <div className="mt-6 text-center">
        <div className="inline-block p-4 bg-gradient-to-br from-white to-pink-50 rounded-2xl border border-pink-100">
          <div className="text-4xl mb-2">📸</div>
          <p className="text-gray-700">
            Setiap kata dalam pesan ini tulus dari hati limud
          </p>
          <div className="mt-3 flex justify-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-300 to-purple-300"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretMessage;
