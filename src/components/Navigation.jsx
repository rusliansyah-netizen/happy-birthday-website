const Navigation = ({
  activeSection,
  setActiveSection,
  audioPlaying,
  setAudioPlaying,
}) => {
  const navItems = [
    { id: "landing", label: "Home", icon: "🏠" },
    { id: "gallery", label: "Gallery", icon: "🖼️" },
    { id: "secret", label: "Message", icon: "❤️" },
    { id: "cake", label: "Cake", icon: "🎂" },
    { id: "balloons", label: "Balloons", icon: "🎈" },
    { id: "rain", label: "Heart Rain", icon: "❤️🌧️" },
    { id: "letters", label: "Letters", icon: "💌" },
    { id: "shake", label: "Shake", icon: "📱" },
  ];

  const handleMusicToggle = () => {
    // Dispatch custom event untuk toggle musik
    const event = new CustomEvent("toggleMusic", {
      detail: { play: !audioPlaying },
    });
    window.dispatchEvent(event);
    setAudioPlaying(!audioPlaying);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">🎂</span>
            </div>
            <h1 className="text-xl font-bold text-pink-600 font-comic">
              Happy Birthday!
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex flex-wrap gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all text-sm ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleMusicToggle}
              className={`p-2 rounded-full transition-all ${
                audioPlaying
                  ? "bg-pink-100 text-pink-600 animate-pulse"
                  : "bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600"
              }`}
              title={audioPlaying ? "Stop Music" : "Play Music"}
            >
              <span className="text-xl">{audioPlaying ? "🔊" : "🔇"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex overflow-x-auto py-2 -mx-4 px-4 lg:hidden">
          <div className="flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all flex-shrink-0 min-w-[70px] ${
                  activeSection === item.id
                    ? "text-pink-600 bg-pink-50"
                    : "text-gray-600"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
