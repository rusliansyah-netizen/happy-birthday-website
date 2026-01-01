import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import gsap from "gsap";

const InteractiveCake = () => {
  const [slices, setSlices] = useState(0);
  const [showMessage, setShowMessage] = useState("");
  const [candles, setCandles] = useState([1, 2, 3, 4, 5]);
  const [isBlowing, setIsBlowing] = useState(false);

  const sliceMessages = [
    "Potongan pertama untuk kebahagiaan! 🎉",
    "Potongan kedua untuk kesehatan! 💪",
    "Potongan ketiga untuk cinta! ❤️",
    "Potongan keempat untuk kesuksesan! 🚀",
    "Potongan kelima untuk petualangan! 🌟",
    "Potongan keenam untuk kebahagiaan keluarga! 👨‍👩‍👧‍👦",
    "Potongan ketujuh untuk impian yang terkabul! ✨",
    "Potongan kedelapan untuk tahun yang menyenangkan! 🎊",
  ];

  const blowCandle = (candleIndex) => {
    setCandles((prev) => prev.filter((_, i) => i !== candleIndex));

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
    });

    const messages = [
      "Wish granted! ✨",
      "Impianmu akan terkabul! 🌟",
      "Semoga harapanmu menjadi kenyataan! 💫",
    ];
    setShowMessage(messages[Math.floor(Math.random() * messages.length)]);

    setTimeout(() => setShowMessage(""), 2000);
  };

  const cutSlice = () => {
    if (slices < 8) {
      setSlices((prev) => prev + 1);

      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0.3 },
      });

      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 0.7 },
      });

      setShowMessage(sliceMessages[slices]);
      setTimeout(() => setShowMessage(""), 3000);
    }
  };

  const resetCake = () => {
    setSlices(0);
    setCandles([1, 2, 3, 4, 5]);
    setShowMessage("Kue sudah siap lagi! 🎂");
    setTimeout(() => setShowMessage(""), 2000);
  };

  return (
    <div className="card p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <span className="text-2xl mr-2">🎂</span>
        <h3 className="text-2xl font-bold text-gray-800">
          🎂 Potong Kue Ulang Tahun!
        </h3>
      </div>

      {/* Cake Display */}
      <div className="relative mx-auto w-64 h-64 mb-6">
        {/* Cake Base */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-t-3xl rounded-b-lg shadow-lg">
          {/* Cake Layers */}
          <div className="absolute inset-x-4 top-0 h-32 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-3xl"></div>

          {/* Cream */}
          <div className="absolute inset-x-8 top-24 h-4 bg-white rounded-full opacity-80"></div>

          {/* Slice Indicators */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-8 h-32 top-4 ${
                i < slices ? "bg-pink-200 opacity-50" : ""
              }`}
              style={{
                left: `${i * 32}px`,
                clipPath: "polygon(0% 0%, 100% 0%, 50% 100%, 0% 100%)",
              }}
            ></div>
          ))}
        </div>

        {/* Candles */}
        {candles.map((candle, index) => (
          <button
            key={index}
            onClick={() => blowCandle(index)}
            className="absolute bottom-36 transform transition-transform hover:scale-110"
            style={{ left: `${50 + index * 40}px` }}
          >
            <div className="relative">
              {/* Candle */}
              <div className="w-3 h-12 mx-auto bg-gradient-to-b from-red-500 to-pink-500 rounded-t-sm"></div>

              {/* Flame */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-pink-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Potongan Dipotong</p>
          <p className="text-3xl font-bold text-pink-600">{slices}/8</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Lilin Ditiup</p>
          <p className="text-3xl font-bold text-purple-600">
            {5 - candles.length}/5
          </p>
        </div>
      </div>

      {/* Messages */}
      {showMessage && (
        <div className="mb-4 animate-fade-in-up">
          <div className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full">
            <span className="mr-2">✨</span>
            {showMessage}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={cutSlice}
          disabled={slices >= 8}
          className={`btn-primary flex items-center ${
            slices >= 8 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="text-xl mr-2">🎂</span>
          Potong Kue ({8 - slices} tersisa)
        </button>

        <button
          onClick={() => blowCandle(0)}
          disabled={candles.length === 0}
          className="btn-secondary flex items-center"
        >
          <span className="text-xl mr-2">✨</span>
          Tiup Lilin
        </button>

        <button
          onClick={resetCake}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
        >
          <span className="mr-2">🔄</span>
          Reset Kue
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-sm text-gray-600">
        <p className="mb-2">🎮 Cara Main:</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
          <li className="flex items-center">
            <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
            Klik "Potong Kue" untuk memotong
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            Klik lilin untuk meniupnya
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            Setiap potong ada kejutan!
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Reset untuk mulai lagi
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InteractiveCake;
