import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const HeartRain = () => {
  const [isRaining, setIsRaining] = useState(false);
  const [intensity, setIntensity] = useState(50);
  const [windSpeed, setWindSpeed] = useState(0);
  const [heartsCaught, setHeartsCaught] = useState(0);
  const [totalHearts, setTotalHearts] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const containerRef = useRef(null);
  const bucketRef = useRef(null);
  const heartsRef = useRef([]);

  const heartTypes = [
    { emoji: "❤️", points: 10, rarity: "common", color: "text-red-500" },
    { emoji: "💖", points: 20, rarity: "uncommon", color: "text-pink-500" },
    { emoji: "💕", points: 30, rarity: "rare", color: "text-purple-500" },
    { emoji: "💘", points: 50, rarity: "epic", color: "text-indigo-500" },
    { emoji: "💓", points: 100, rarity: "legendary", color: "text-yellow-500" },
  ];

  const startRain = () => {
    if (!gameActive) return;

    setIsRaining(true);
    setTotalHearts(0);
    setHeartsCaught(0);
    heartsRef.current = [];

    // Clear container
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    // Start generating hearts
    const heartInterval = setInterval(() => {
      if (isRaining && gameActive) {
        createHeart();
        setTotalHearts((prev) => prev + 1);
      }
    }, 1000 - intensity * 8);

    // Auto stop after 30 seconds
    setTimeout(() => {
      if (isRaining) {
        setIsRaining(false);
        clearInterval(heartInterval);
      }
    }, 30000);

    return () => clearInterval(heartInterval);
  };

  const createHeart = () => {
    if (!containerRef.current) return;

    const heartType = getRandomHeartType();
    const heartId = Date.now() + Math.random();

    const heart = {
      id: heartId,
      type: heartType,
      x: Math.random() * 90 + 5,
      speed: (Math.random() * 2 + 1) * (intensity / 50),
      rotation: Math.random() * 360,
    };

    heartsRef.current.push(heart);
    renderHeart(heart);

    // Auto remove after 10 seconds
    setTimeout(() => {
      removeHeart(heartId);
    }, 10000);
  };

  const getRandomHeartType = () => {
    const random = Math.random() * 100;
    if (random < 50) return heartTypes[0]; // 50% common
    if (random < 75) return heartTypes[1]; // 25% uncommon
    if (random < 90) return heartTypes[2]; // 15% rare
    if (random < 98) return heartTypes[3]; // 8% epic
    return heartTypes[4]; // 2% legendary
  };

  const getHeartGlow = (rarity) => {
    const glows = {
      common: "drop-shadow(0 0 2px #ff6b6b)",
      uncommon: "drop-shadow(0 0 4px #ff8e53)",
      rare: "drop-shadow(0 0 6px #ffce54)",
      epic: "drop-shadow(0 0 8px #a78bfa)",
      legendary: "drop-shadow(0 0 12px #f472b6)",
    };
    return glows[rarity];
  };

  const renderHeart = (heart) => {
    const container = containerRef.current;
    if (!container) return;

    const heartElement = document.createElement("div");
    heartElement.id = `heart-${heart.id}`;
    heartElement.className =
      "absolute text-3xl cursor-pointer transform animate-float z-10";
    heartElement.style.left = `${heart.x}%`;
    heartElement.style.top = "0";
    heartElement.innerHTML = heart.type.emoji;
    heartElement.style.filter = getHeartGlow(heart.type.rarity);
    heartElement.style.color = heart.type.color.replace("text-", "");

    // Wind effect
    heartElement.style.transform = `translateX(${windSpeed * 2}px) rotate(${
      heart.rotation
    }deg)`;

    // Falling animation
    gsap.to(heartElement, {
      y: container.clientHeight - 100,
      duration: 10 / heart.speed,
      ease: "linear",
      onComplete: () => {
        if (heartElement.parentNode) {
          heartElement.parentNode.removeChild(heartElement);
        }
        removeHeart(heart.id);
      },
    });

    // Click handler
    heartElement.addEventListener("click", () =>
      catchHeart(heart.id, heart.type)
    );

    container.appendChild(heartElement);
  };

  const catchHeart = (heartId, heartType) => {
    if (!gameActive) return;

    // Remove heart
    const heartElement = document.getElementById(`heart-${heartId}`);
    if (heartElement) {
      gsap.to(heartElement, {
        scale: 1.5,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (heartElement.parentNode) {
            heartElement.parentNode.removeChild(heartElement);
          }
          removeHeart(heartId);
        },
      });
    }

    // Add to caught hearts
    setHeartsCaught((prev) => prev + 1);

    // Animate to bucket
    animateToBucket(heartType);
  };

  const animateToBucket = (heartType) => {
    const bucket = bucketRef.current;
    if (!bucket) return;

    const flyingHeart = document.createElement("div");
    flyingHeart.className = "absolute text-2xl z-50 pointer-events-none";
    flyingHeart.innerHTML = heartType.emoji;
    flyingHeart.style.filter = getHeartGlow(heartType.rarity);
    flyingHeart.style.color = heartType.color.replace("text-", "");

    if (containerRef.current) {
      containerRef.current.appendChild(flyingHeart);

      const startX = Math.random() * (containerRef.current.clientWidth - 50);
      const startY = 0;

      const bucketRect = bucket.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      gsap.fromTo(
        flyingHeart,
        {
          x: startX,
          y: startY,
          scale: 1,
        },
        {
          x: bucketRect.x - containerRect.x + 25,
          y: bucketRect.y - containerRect.y + 25,
          scale: 0.5,
          duration: 1,
          ease: "power2.in",
          onComplete: () => {
            if (flyingHeart.parentNode) {
              flyingHeart.parentNode.removeChild(flyingHeart);
            }
            // Bucket animation
            gsap.to(bucket, {
              scale: 1.2,
              duration: 0.1,
              yoyo: true,
              repeat: 1,
            });
          },
        }
      );
    }
  };

  const removeHeart = (heartId) => {
    heartsRef.current = heartsRef.current.filter((h) => h.id !== heartId);
  };

  const stopRain = () => {
    setIsRaining(false);
    // Clear all hearts
    heartsRef.current.forEach((heart) => {
      const element = document.getElementById(`heart-${heart.id}`);
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    heartsRef.current = [];
  };

  const toggleGame = () => {
    setGameActive(!gameActive);
    if (!gameActive && isRaining) {
      stopRain();
    }
  };

  const resetGame = () => {
    stopRain();
    setHeartsCaught(0);
    setTotalHearts(0);
    setIntensity(50);
    setWindSpeed(0);
    setGameActive(true);
  };

  // Wind effect
  useEffect(() => {
    if (isRaining && gameActive && windSpeed !== 0) {
      heartsRef.current.forEach((heart) => {
        const element = document.getElementById(`heart-${heart.id}`);
        if (element) {
          gsap.to(element, {
            x: `+=${windSpeed * 2}`,
            duration: 1,
            ease: "sine.inOut",
          });
        }
      });
    }
  }, [windSpeed, isRaining, gameActive]);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center mr-3">
            <span className="text-white text-xl">❤️</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              ❤️ Hujan Hati Ajaib
            </h3>
            <p className="text-gray-600">
              Tangkap hati yang jatuh dari langit!
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold text-gradient">{heartsCaught}</div>
          <div className="text-sm text-gray-600">Hati Tertangkap</div>
        </div>
      </div>

      {/* Game Status */}
      <div className="mb-4 flex justify-center">
        <div
          className={`inline-flex items-center px-4 py-2 rounded-full ${
            gameActive
              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
          }`}
        >
          <span className="mr-2">{gameActive ? "🎮" : "⏸️"}</span>
          <span className="font-medium">
            {gameActive ? "Game Aktif" : "Game Paused"}
          </span>
        </div>
      </div>

      {/* Weather Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="text-xl mr-2">🌧️</span>
              <span className="font-medium">Intensitas Hujan</span>
            </div>
            <span className="font-bold text-blue-600">{intensity}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            disabled={!gameActive}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Gerimis</span>
            <span>Hujan Sedang</span>
            <span>Badai Hati!</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="text-xl mr-2">💨</span>
              <span className="font-medium">Kecepatan Angin</span>
            </div>
            <span className="font-bold text-gray-600">{windSpeed}</span>
          </div>
          <input
            type="range"
            min="-20"
            max="20"
            value={windSpeed}
            onChange={(e) => setWindSpeed(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            disabled={!gameActive}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Kiri</span>
            <span>Tenang</span>
            <span>Kanan</span>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative mb-6">
        <div
          ref={containerRef}
          className="relative h-80 bg-gradient-to-b from-blue-100 to-purple-100 rounded-2xl border-2 border-blue-200 overflow-hidden"
        >
          {/* Cloud */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="w-48 h-16 bg-gradient-to-b from-white to-gray-100 rounded-full shadow-lg"></div>
              <div className="absolute -top-2 left-8 w-12 h-12 bg-white rounded-full"></div>
              <div className="absolute -top-4 left-16 w-16 h-16 bg-white rounded-full"></div>
              <div className="absolute -top-2 right-8 w-12 h-12 bg-white rounded-full"></div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-2xl">
                ☁️
              </div>
            </div>
          </div>

          {/* Bucket */}
          <div
            ref={bucketRef}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
          >
            <div className="relative">
              <div className="w-16 h-12 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-lg"></div>
              <div className="absolute -top-2 inset-x-0">
                <div className="w-20 h-4 bg-gradient-to-b from-gray-400 to-gray-500 rounded-t-lg"></div>
              </div>
              <div className="absolute -top-4 left-6 w-8 h-2 bg-gray-400 rounded-full"></div>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
                {heartsCaught}
              </div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xl">
                🪣
              </div>
            </div>
          </div>

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-xl"></div>

          {/* Instructions */}
          {!isRaining && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">❤️</div>
                <p className="text-gray-600 font-medium">
                  Klik "Mulai Hujan Hati" untuk mulai!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{totalHearts}</div>
          <div className="text-sm text-gray-600">Total Hati</div>
        </div>
        <div className="bg-pink-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-pink-600">
            {totalHearts > 0
              ? Math.round((heartsCaught / totalHearts) * 100)
              : 0}
            %
          </div>
          <div className="text-sm text-gray-600">Accuracy</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round((intensity * Math.abs(windSpeed)) / 10)}
          </div>
          <div className="text-sm text-gray-600">Wind Power</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {heartsCaught * intensity}
          </div>
          <div className="text-sm text-gray-600">Total Score</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={startRain}
          disabled={isRaining || !gameActive}
          className={`btn-primary flex items-center ${
            isRaining || !gameActive ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="text-xl mr-2">🌧️</span>
          {isRaining ? "Hujan Sedang Turun..." : "Mulai Hujan Hati!"}
        </button>

        <button
          onClick={stopRain}
          disabled={!isRaining || !gameActive}
          className={`bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center ${
            !isRaining || !gameActive ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="text-xl mr-2">⚡</span>
          Hentikan Hujan
        </button>

        <button
          onClick={toggleGame}
          className={`bg-gradient-to-r ${
            gameActive
              ? "from-red-500 to-pink-500"
              : "from-green-500 to-emerald-500"
          } text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center`}
        >
          <span className="text-xl mr-2">{gameActive ? "⏸️" : "▶️"}</span>
          {gameActive ? "Pause Game" : "Lanjutkan"}
        </button>

        <button
          onClick={resetGame}
          className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
        >
          <span className="text-xl mr-2">🔄</span>
          Reset Game
        </button>
      </div>

      {/* Heart Types */}
      <div className="mb-6">
        <p className="font-semibold text-gray-700 mb-3">🎯 Jenis-jenis Hati:</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {heartTypes.map((heart, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 p-3 rounded-xl text-center border border-gray-200"
            >
              <div
                className="text-3xl mb-2"
                style={{ filter: getHeartGlow(heart.rarity) }}
              >
                {heart.emoji}
              </div>
              <div className="font-bold text-gray-800">{heart.points} pts</div>
              <div
                className={`text-xs font-medium px-2 py-1 rounded-full mt-1 ${
                  heart.rarity === "common"
                    ? "bg-green-100 text-green-800"
                    : heart.rarity === "uncommon"
                    ? "bg-blue-100 text-blue-800"
                    : heart.rarity === "rare"
                    ? "bg-purple-100 text-purple-800"
                    : heart.rarity === "epic"
                    ? "bg-pink-100 text-pink-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {heart.rarity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-sm text-gray-600">
        <p className="font-semibold mb-2">🎮 Cara Bermain:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs">1</span>
            </div>
            <p>Klik "Mulai Hujan Hati" untuk memulai</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs">2</span>
            </div>
            <p>Klik hati yang jatuh untuk menangkapnya</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs">3</span>
            </div>
            <p>Atur intensitas dan angin untuk tantangan</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs">4</span>
            </div>
            <p>Hati langka memberikan lebih banyak poin</p>
          </div>
        </div>
      </div>

      {/* High Score Celebration */}
      {heartsCaught > 20 && (
        <div className="mt-4 animate-pulse">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-xl text-center">
            <div className="text-2xl mb-2">🏆 HEART MASTER! 🏆</div>
            <p className="font-bold">
              Anda telah menangkap {heartsCaught} hati!
            </p>
            <p className="text-sm opacity-90">
              Anda adalah Heart Catcher profesional! ❤️👑
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeartRain;
