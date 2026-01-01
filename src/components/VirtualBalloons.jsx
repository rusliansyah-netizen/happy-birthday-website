import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";

const VirtualBalloons = () => {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lastPopTime, setLastPopTime] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const containerRef = useRef(null);

  const balloonColors = [
    { bg: "bg-pink-500", text: "text-pink-500" },
    { bg: "bg-purple-500", text: "text-purple-500" },
    { bg: "bg-yellow-500", text: "text-yellow-500" },
    { bg: "bg-blue-500", text: "text-blue-500" },
    { bg: "bg-green-500", text: "text-green-500" },
    { bg: "bg-red-500", text: "text-red-500" },
  ];

  const balloonIcons = ["❤️", "🎉", "✨", "🥳", "🎂", "🎁", "🌟", "💫"];

  const getRandomMessage = () => {
    const messages = [
      "You're amazing! ✨",
      "Happy Birthday! 🎂",
      "Make a wish! 🌟",
      "You shine bright! ☀️",
      "Best day ever! 🎊",
      "So proud of you! 👏",
      "Dream big! 🚀",
      "You're loved! 💖",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const createBalloon = () => {
    if (!gameActive) return;

    const newBalloon = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      speed: Math.random() * 2 + 1,
      size: Math.random() * 30 + 40,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      icon: balloonIcons[Math.floor(Math.random() * balloonIcons.length)],
      message: getRandomMessage(),
    };

    setBalloons((prev) => [...prev, newBalloon]);

    // Auto remove after 15 seconds
    setTimeout(() => {
      setBalloons((prev) => prev.filter((b) => b.id !== newBalloon.id));
    }, 15000);
  };

  const popBalloon = (balloonId, balloonIndex) => {
    if (!gameActive) return;

    // Calculate combo
    const now = Date.now();
    if (now - lastPopTime < 1000) {
      setCombo((prev) => prev + 1);
    } else {
      setCombo(1);
    }
    setLastPopTime(now);

    // Calculate points (size matters - smaller = more points)
    const balloon = balloons[balloonIndex];
    const points = Math.floor(100 - balloon.size + combo * 10);
    setScore((prev) => prev + points);

    // Animate pop
    const balloonElement = document.getElementById(`balloon-${balloonId}`);
    if (balloonElement) {
      gsap.to(balloonElement, {
        scale: 1.5,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setBalloons((prev) => prev.filter((b) => b.id !== balloonId));
        },
      });
    }

    // Show pop effect
    showPopEffect(balloon.x, balloon.color);

    // Show message
    showBalloonMessage(balloon.message, balloon.x);
  };

  const showPopEffect = (x, color) => {
    const effect = document.createElement("div");
    effect.className = "absolute text-2xl animate-ping pointer-events-none";
    effect.style.left = `${x}%`;
    effect.style.top = "80%";
    effect.textContent = "💥";
    effect.style.zIndex = "1000";

    if (containerRef.current) {
      containerRef.current.appendChild(effect);

      setTimeout(() => {
        if (effect.parentNode) {
          effect.parentNode.removeChild(effect);
        }
      }, 1000);
    }
  };

  const showBalloonMessage = (message, x) => {
    const messageElement = document.createElement("div");
    messageElement.className =
      "absolute text-white bg-black/70 px-3 py-1 rounded-lg text-sm font-medium pointer-events-none animate-fade-in-up";
    messageElement.style.left = `${x}%`;
    messageElement.style.top = "70%";
    messageElement.textContent = message;
    messageElement.style.zIndex = "1000";
    messageElement.style.transform = "translateX(-50%)";

    if (containerRef.current) {
      containerRef.current.appendChild(messageElement);

      // Animate message
      gsap.to(messageElement, {
        y: -50,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
          }
        },
      });
    }
  };

  const releaseBalloons = (count) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => createBalloon(), i * 200);
    }
  };

  const resetGame = () => {
    setBalloons([]);
    setScore(0);
    setCombo(0);
    setGameActive(true);
  };

  const toggleGame = () => {
    setGameActive(!gameActive);
    if (!gameActive) {
      // If turning game back on, clear all balloons
      setBalloons([]);
    }
  };

  // Auto generate balloons
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameActive && balloons.length < 15) {
        createBalloon();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [balloons.length, gameActive]);

  // Animation for floating
  useEffect(() => {
    balloons.forEach((balloon) => {
      const element = document.getElementById(`balloon-${balloon.id}`);
      if (element) {
        gsap.to(element, {
          y: "-100vh",
          duration: 20 / balloon.speed,
          ease: "none",
        });
      }
    });
  }, [balloons]);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mr-3">
            <span className="text-white text-xl">🎈</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              🎈 Virtual Balloon Popper
            </h3>
            <p className="text-gray-600">Pop balon dapatkan pesan kejutan!</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold text-gradient">{score}</div>
          <div className="text-sm text-gray-600">Score</div>
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

      {/* Combo Display */}
      {combo > 1 && (
        <div className="mb-4 text-center animate-pulse">
          <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-lg font-bold">
            🔥 COMBO x{combo}!
          </div>
        </div>
      )}

      {/* Game Container */}
      <div
        ref={containerRef}
        className="relative h-96 bg-gradient-to-b from-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-pink-200 overflow-hidden mb-6"
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 text-3xl opacity-20">🎈</div>
          <div className="absolute top-10 right-8 text-4xl opacity-20">🎉</div>
          <div className="absolute bottom-8 left-10 text-3xl opacity-20">
            ✨
          </div>
          <div className="absolute bottom-12 right-12 text-4xl opacity-20">
            🌟
          </div>
        </div>

        {/* Balloons */}
        {balloons.map((balloon, index) => (
          <button
            key={balloon.id}
            id={`balloon-${balloon.id}`}
            onClick={() => popBalloon(balloon.id, index)}
            className="absolute transform -translate-x-1/2 bottom-0 cursor-pointer hover:scale-110 transition-transform z-10"
            style={{
              left: `${balloon.x}%`,
              width: `${balloon.size}px`,
              height: `${balloon.size * 1.2}px`,
            }}
            disabled={!gameActive}
          >
            {/* Balloon Body */}
            <div
              className={`relative w-full h-full ${balloon.color.bg} rounded-full shadow-lg`}
            >
              {/* Balloon Tip */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-10 bg-gray-300"></div>

              {/* Shine Effect */}
              <div className="absolute top-2 left-4 w-4 h-4 bg-white/30 rounded-full"></div>

              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                {balloon.icon}
              </div>
            </div>

            {/* String */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gray-400"></div>
          </button>
        ))}

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-xl"></div>

        {/* Instructions */}
        {balloons.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎈</div>
              <p className="text-gray-600 font-medium">
                Klik "Lepas Balon" untuk mulai!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-pink-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-pink-600">
            {balloons.length}
          </div>
          <div className="text-sm text-gray-600">Balon Aktif</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{combo}</div>
          <div className="text-sm text-gray-600">Combo</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {balloons.length > 0
              ? Math.max(...balloons.map((b) => b.speed)).toFixed(1)
              : "0"}
          </div>
          <div className="text-sm text-gray-600">Speed Max</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            {balloons.length > 0 ? Math.floor(score / balloons.length) : "0"}
          </div>
          <div className="text-sm text-gray-600">Avg. Score</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={() => releaseBalloons(5)}
          disabled={!gameActive}
          className={`btn-primary flex items-center ${
            !gameActive ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="text-xl mr-2">🎈</span>
          Lepas 5 Balon
        </button>

        <button
          onClick={() => releaseBalloons(10)}
          disabled={!gameActive}
          className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center ${
            !gameActive ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="text-xl mr-2">🎉</span>
          Lepas 10 Balon
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

      {/* Score Guide */}
      <div className="mb-6">
        <p className="font-semibold text-gray-700 mb-2">🎯 Sistem Skor:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-3 rounded-xl text-center">
            <div className="text-2xl">🎈</div>
            <div className="font-bold text-pink-600">Balon Kecil</div>
            <div className="text-sm text-gray-600">50-100 poin</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl text-center">
            <div className="text-2xl">🎈🎈</div>
            <div className="font-bold text-purple-600">Balon Besar</div>
            <div className="text-sm text-gray-600">10-50 poin</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 rounded-xl text-center">
            <div className="text-2xl">🔥</div>
            <div className="font-bold text-yellow-600">Combo</div>
            <div className="text-sm text-gray-600">+10 per combo</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl text-center">
            <div className="text-2xl">💫</div>
            <div className="font-bold text-blue-600">Pesan</div>
            <div className="text-sm text-gray-600">Bonus pesan</div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-sm text-gray-600">
        <p className="font-semibold mb-2">🎮 Cara Bermain:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs">1</span>
            </div>
            <p>Klik "Lepas Balon" untuk melepaskan balon</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs">2</span>
            </div>
            <p>Klik balon untuk meletuskannya</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs">3</span>
            </div>
            <p>Balon kecil memberikan lebih banyak poin</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs">4</span>
            </div>
            <p>Klik cepat untuk mendapatkan combo bonus</p>
          </div>
        </div>
      </div>

      {/* Sample Messages */}
      <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
        <p className="font-semibold text-gray-700 mb-2">
          💌 Pesan Kejutan yang Muncul:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "You're amazing! ✨",
            "Happy Birthday! 🎂",
            "Make a wish! 🌟",
            "Dream big! 🚀",
            "You're loved! 💖",
          ].map((msg, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-white/70 rounded-full text-sm"
            >
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/* High Score Celebration */}
      {score > 500 && (
        <div className="mt-4 animate-pulse">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-xl text-center">
            <div className="text-2xl mb-2">🏆 WOAH! 🏆</div>
            <p className="font-bold">
              Score Anda {score}! Achievement Unlocked!
            </p>
            <p className="text-sm opacity-90">
              Anda adalah Balloon Master! 🎈👑
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualBalloons;
