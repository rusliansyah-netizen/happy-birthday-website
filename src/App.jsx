import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Gallery from "./components/Gallery";
import SecretMessage from "./components/SecretMessage";
import Navigation from "./components/Navigation";
import InteractiveCake from "./components/InteractiveCake";
import VirtualBalloons from "./components/VirtualBalloons";
import HeartRain from "./components/HeartRain";
import OpenWhenLetters from "./components/OpenWhenLetters";
import ShakeDetector from "./components/ShakeDetector";

function App() {
  const [activeSection, setActiveSection] = useState("landing");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [globalAudio, setGlobalAudio] = useState(null);

  // Setup global audio event listeners
  useEffect(() => {
    const handleToggleMusic = (event) => {
      const shouldPlay = event.detail?.play ?? false;

      // Dispatch event ke semua komponen yang perlu merespon
      const audioEvent = new CustomEvent("globalMusicToggle", {
        detail: { play: shouldPlay },
      });
      window.dispatchEvent(audioEvent);

      console.log("🎵 Global music toggle:", shouldPlay ? "PLAY" : "PAUSE");
    };

    window.addEventListener("toggleMusic", handleToggleMusic);

    return () => {
      window.removeEventListener("toggleMusic", handleToggleMusic);
    };
  }, []);

  const sections = {
    landing: {
      name: "Home",
      component: (
        <Landing
          setActiveSection={setActiveSection}
          setAudioPlaying={setAudioPlaying}
        />
      ),
      icon: "🏠",
    },
    gallery: { name: "Gallery", component: <Gallery />, icon: "🖼️" },
    secret: { name: "Message", component: <SecretMessage />, icon: "❤️" },
    cake: { name: "Cake", component: <InteractiveCake />, icon: "🎂" },
    balloons: { name: "Balloons", component: <VirtualBalloons />, icon: "🎈" },
    rain: { name: "Heart Rain", component: <HeartRain />, icon: "❤️🌧️" },
    letters: { name: "Letters", component: <OpenWhenLetters />, icon: "💌" },
    shake: { name: "Shake", component: <ShakeDetector />, icon: "📱" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-birthday-pink via-birthday-yellow to-birthday-blue">
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        audioPlaying={audioPlaying}
        setAudioPlaying={setAudioPlaying}
        sections={Object.keys(sections)}
      />

      <main className="container mx-auto px-4 py-8">
        {sections[activeSection]?.component}

        {/* Interactive Features Grid */}
        {activeSection === "landing" && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              🎮 Fitur Interaktif Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(sections)
                .filter(
                  ([key]) => !["landing", "gallery", "secret"].includes(key)
                )
                .map(([key, section]) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:scale-105 transition-all shadow-lg hover:shadow-xl border border-white/20"
                  >
                    <div className="text-4xl mb-3">{section.icon}</div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {section.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {key === "cake" && "Potong kue virtual"}
                      {key === "balloons" && "Letuskan balon"}
                      {key === "rain" && "Tangkap hati jatuh"}
                      {key === "letters" && "Baca surat rahasia"}
                      {key === "shake" && "Goyang HP untuk confetti"}
                    </p>
                  </button>
                ))}
            </div>

            {/* Audio Help Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="mr-2">🎵</span>
                Masalah dengan Musik?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium mb-1">Jika musik tidak diputar:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Klik tombol "Klik untuk Kejutan!" di halaman utama</li>
                    <li>
                      Browser mungkin memblokir autoplay - klik tombol musik
                    </li>
                    <li>Pastikan volume browser tidak mute</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Untuk pengalaman terbaik:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Gunakan browser Chrome/Firefox terbaru</li>
                    <li>Allow autoplay di browser settings</li>
                    <li>Refresh halaman jika ada masalah</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-4 text-gray-600 text-sm">
        <p>Dibuat dengan ❤️ untuk ulang tahun spesialmu!</p>
        <p className="mt-1">
          {audioPlaying ? "🎵 Musik menyala • " : "🔇 Musik mati • "}
          🎂 🎈 🎉 ✨ 💖
        </p>
      </footer>
    </div>
  );
}

export default App;
