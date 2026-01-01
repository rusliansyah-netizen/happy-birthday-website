import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

const ShakeDetector = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [lastShakeTime, setLastShakeTime] = useState(0);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // Check if DeviceMotion is supported
    if (typeof window !== "undefined" && window.DeviceMotionEvent) {
      setIsSupported(true);
      requestPermission();
    }

    return () => {
      // Cleanup event listeners
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

  const requestPermission = () => {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            setPermissionGranted(true);
            startDetection();
          }
        })
        .catch(console.error);
    } else {
      // For non-iOS devices
      setPermissionGranted(true);
      startDetection();
    }
  };

  const startDetection = () => {
    window.addEventListener("devicemotion", handleMotion);
  };

  const handleMotion = (event) => {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;

    // Calculate total acceleration
    const totalAcceleration = Math.sqrt(
      Math.pow(acceleration.x || 0, 2) +
        Math.pow(acceleration.y || 0, 2) +
        Math.pow(acceleration.z || 0, 2)
    );

    // Set intensity for visual feedback
    setShakeIntensity(Math.min(totalAcceleration / 20, 1));

    // Detect shake (threshold > 15 m/s²)
    if (totalAcceleration > 15) {
      const now = Date.now();

      // Debounce shakes (max 1 per 500ms)
      if (now - lastShakeTime > 500) {
        triggerShake(now, totalAcceleration);
      }
    }
  };

  const triggerShake = (timestamp, intensity) => {
    setLastShakeTime(timestamp);
    setShakeCount((prev) => prev + 1);
    setIsShaking(true);

    // Trigger confetti based on intensity
    const particleCount = Math.min(Math.floor(intensity * 2), 200);

    confetti({
      particleCount: particleCount,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
    });

    // Vibration (if supported)
    if (navigator.vibrate) {
      const vibrationPattern = intensity > 20 ? [100, 50, 100] : [100];
      navigator.vibrate(vibrationPattern);
    }

    // Reset shaking state
    setTimeout(() => setIsShaking(false), 500);

    // Special effects for certain counts
    if ((shakeCount + 1) % 5 === 0) {
      // Every 5 shakes, bigger confetti
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 100);
    }
  };

  const simulateShake = () => {
    triggerShake(Date.now(), 18);
  };

  const resetCounter = () => {
    setShakeCount(0);
    setShakeIntensity(0);
  };

  if (!isSupported) {
    return (
      <div className="card p-6">
        <div className="text-center">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            📱 Fitur Goyang HP Tidak Didukung
          </h3>
          <p className="text-gray-600 mb-4">
            Browser atau device Anda tidak mendukung fitur deteksi gerakan.
          </p>
          <button onClick={simulateShake} className="btn-primary">
            <span className="mr-2">⚡</span>
            Simulasikan Goyangan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
            <span className="text-white text-xl">📱</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              📱 Shake for Surprise!
            </h3>
            <p className="text-gray-600">Goyangkan HP untuk confetti!</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold text-gradient">{shakeCount}</div>
          <div className="text-sm text-gray-600">Goyangan</div>
        </div>
      </div>

      {!permissionGranted ? (
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
          <div className="text-4xl mb-4">🔔</div>
          <h4 className="text-xl font-bold text-gray-800 mb-2">
            Izin Diperlukan
          </h4>
          <p className="text-gray-600 mb-4">
            Fitur ini memerlukan izin untuk mengakses sensor gerakan HP Anda.
          </p>
          <button onClick={requestPermission} className="btn-primary">
            <span className="mr-2">✅</span>
            Berikan Izin
          </button>
        </div>
      ) : (
        <>
          {/* Intensity Visualizer */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-xl mr-2">⚡</span>
                <span className="font-medium">Intensitas Goyangan</span>
              </div>
              <span className="font-bold text-gray-700">
                {Math.round(shakeIntensity * 100)}%
              </span>
            </div>
            <div className="h-4 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-300"
                style={{ width: `${shakeIntensity * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Lembut</span>
              <span>Sedang</span>
              <span>Keras</span>
            </div>
          </div>

          {/* Shake Animation */}
          <div className="relative h-40 mb-6">
            <div
              className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
                isShaking ? "animate-shake" : ""
              }`}
            >
              <div className="relative">
                {/* Phone */}
                <div className="w-32 h-56 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl border-8 border-gray-700 flex flex-col items-center justify-center p-4 shadow-2xl">
                  {/* Screen */}
                  <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mb-3 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-3xl">{shakeCount}</div>
                      <div className="text-xs">SHAKES</div>
                    </div>
                  </div>

                  {/* Home Button */}
                  <div className="w-8 h-8 rounded-full border-2 border-gray-600"></div>

                  {/* Shake Indicator */}
                  {isShaking && (
                    <div className="absolute -top-2 -right-2">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-ping"></div>
                        <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Shake Arrows */}
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
                  <div className="text-2xl animate-pulse">←</div>
                </div>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                  <div className="text-2xl animate-pulse">→</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {shakeCount}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {lastShakeTime
                  ? Math.floor((Date.now() - lastShakeTime) / 1000)
                  : "∞"}
              </div>
              <div className="text-sm text-gray-600">Detik Lalu</div>
            </div>
            <div className="bg-pink-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-pink-600">
                {Math.floor(shakeIntensity * 100)}
              </div>
              <div className="text-sm text-gray-600">Intensitas</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {Math.floor(shakeCount / 5)}
              </div>
              <div className="text-sm text-gray-600">Milestone</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={simulateShake}
              className="btn-primary flex items-center"
            >
              <span className="text-xl mr-2">⚡</span>
              Simulasikan Shake
            </button>

            <button
              onClick={resetCounter}
              className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <span className="mr-2">🔄</span>
              Reset Counter
            </button>
          </div>
        </>
      )}

      {/* Instructions */}
      <div className="mt-6 text-sm text-gray-600">
        <p className="font-semibold mb-2">📱 Cara Menggunakan:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs">1</span>
            </div>
            <p>Pegang HP dengan kedua tangan</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs">2</span>
            </div>
            <p>Goyangkan seperti sedang mengguncang</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs">3</span>
            </div>
            <p>Semakin keras goyangan, semakin banyak confetti</p>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs">4</span>
            </div>
            <p>Setiap 5 goyangan ada efek spesial</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-white">💡</span>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">Tips:</p>
            <p className="text-sm text-gray-600">
              Fitur ini bekerja optimal di HP dengan sensor gerakan. Untuk
              pengalaman terbaik, berikan izin akses sensor dan pastikan HP Anda
              dalam mode portrait (tegak).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShakeDetector;
