import { useState } from 'react'
import gsap from 'gsap'

const OpenWhenLetters = () => {
  const [openedLetters, setOpenedLetters] = useState([])
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [envelopeAnimation, setEnvelopeAnimation] = useState(false)

  const letters = [
    {
      id: 1,
      icon: '😔',
      title: "When You're Sad",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      content: `Sayangku yang sedang sedih,

Aku tahu hari-hari kamu kadang berat. Tapi ingat, kamu adalah orang yang kuat dan aku selalu percaya pada kemampuan imuu.

Jika kamu merasa down, coba:
1. Ingat momen-momen bahagia kita
2. Dengarkan lagu favorit imuu
3. Nonton video lucu yang bisa membuatmu tertawa

Aku selalu di sini untukmu, selalu.
Cintamu selalu ❤️`
    },
    {
      id: 2,
      icon: '❤️',
      title: "When You Miss Me",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      content: `Untuk imuu yang lagi kangen limud,

Aku juga kangen kamu setiap detik. Tapi ingat, meski kita terpisah jarak, hati kita selalu bersama.

Mari kita:
1. Saling Tuker Kabar setiap hari
2. Nonton film yang sama bersama (jarak jauh)
3. Rencanakan pertemuan kita berikutnya

Setiap hari tanpa kamu terasa panjang, tapi cinta kita membuat semua lebih mudah.
Selalu milikmu 💕`
    },
    {
      id: 3,
      icon: '☕',
      title: "When You Need Motivation",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      content: `Imuu yang sedang berjuang,

Kamu adalah orang yang hebat! Ingat semua pencapaianmu sampai saat ini. Aku sangat bangga padamu!

Ingatlah:
1. Kamu lebih kuat dari yang kamu kira
2. Setiap langkah kecil adalah progres
3. Aku selalu mendukungmu 100%

"Orang yang berani bukan tidak takut, tapi tetap maju meski takut."
Kamu pasti bisa! 💪`
    },
    {
      id: 4,
      icon: '🌙',
      title: "When You Can't Sleep",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      content: `Imuu yang sedang tida bisa bobo,

Tidur yang nyenyak itu penting. Coba teknik ini:
1. Tarik napas dalam 4 detik, tahan 7 detik, buang 8 detik
2. Bayangkan kita sedang di pantai bersama
3. Dengarkan suara ombak atau hujan

Atau ceritakan apa yang membuatmu susah tidur. Aku di sini mendengarkan.

Selamat tidur, mimpi indah tentang aku ya 😉
Cinta 🌙`
    },
    {
      id: 5,
      icon: '🌍',
      title: "When You're Feeling Adventurous",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50",
      content: `Petualanganku,

Waktunya untuk petualangan! Mari kita rencanakan:
1. Road trip ke tempat baru
2. Mencoba makanan aneh bersama
3. Sunrise atau sunset hunting

Hidup terlalu singkat untuk tidak mengambil risiko kecil.
Ayo kita buat kenangan baru yang luar biasa!

"Adventure is out there!" 🗺️`
    },
    {
      id: 6,
      icon: '🎵',
      title: "When You Need to Dance",
      color: "from-fuchsia-500 to-purple-500",
      bgColor: "bg-fuchsia-50",
      content: `Bintang dansaku,

Waktunya berdansa! Putar lagu-lagu ini:
1. Lagu favorit kita berdua
2. Lagu yang bikin kamu happy
3. Lagu nostalgia masa sekolah

Berdansalah seperti tidak ada yang melihat! Aku akan selalu menjadi penari terburuk untuk pasanganmu yang cantik.

Life is a dance, make it fun! 💃`
    },
    {
      id: 7,
      icon: '😊',
      title: "When You're Happy",
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50",
      content: `Sayangku yang sedang bahagia,

Sangat menyenangkan melihatmu bahagia! Aku senang bisa menjadi bagian dari kebahagiaanmu.

Mari kita rayakan:
1. Catat momen bahagia ini di jurnal
2. Bagikan kebahagiaan dengan orang lain
3. Rencanakan sesuatu spesial untuk merayakan

Kebahagiaanmu adalah kebahagiaanku juga.
Teruslah bersinar seperti matahari! ☀️`
    },
    {
      id: 8,
      icon: '🎂',
      title: "On Your Birthday",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      content: `Selamat Ulang Tahun Sayangku! 🎉

Di hari spesialmu ini, aku ingin mengucapkan:
1. Semoga semua impianmu terkabul
2. Semoga kesehatan selalu menyertaimu
3. Semoga kebahagiaan tak pernah berhenti

Kamu adalah hadiah terindah dalam hidupku.
Mari kita buat tahun ini menjadi tahun terbaik!

Selamat ulang tahun sekali lagi! 🎂🎁🎊`
    }
  ]

  const openLetter = (letter) => {
    if (!openedLetters.includes(letter.id)) {
      setOpenedLetters([...openedLetters, letter.id])
    }
    
    setSelectedLetter(letter)
    setEnvelopeAnimation(true)
    
    // Animation
    gsap.fromTo('.letter-content',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    
    setTimeout(() => setEnvelopeAnimation(false), 1000)
  }

  const closeLetter = () => {
    setSelectedLetter(null)
  }

  const getRandomUnopenedLetter = () => {
    const unopened = letters.filter(letter => !openedLetters.includes(letter.id))
    if (unopened.length > 0) {
      const randomLetter = unopened[Math.floor(Math.random() * unopened.length)]
      openLetter(randomLetter)
    } else {
      // If all opened, open random one
      const randomLetter = letters[Math.floor(Math.random() * letters.length)]
      openLetter(randomLetter)
    }
  }

  const openAllLetters = () => {
    const allIds = letters.map(letter => letter.id)
    setOpenedLetters(allIds)
    openLetter(letters[0])
  }

  const resetLetters = () => {
    setOpenedLetters([])
    setSelectedLetter(null)
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center mr-3">
            <span className="text-white text-xl">💌</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              💌 Open When Letters
            </h3>
            <p className="text-gray-600">Surat khusus untuk momen spesial</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold text-gradient">
            {openedLetters.length}/{letters.length}
          </div>
          <div className="text-sm text-gray-600">Surat Terbuka</div>
        </div>
      </div>

      {/* Main Content */}
      {selectedLetter ? (
        // Letter View
        <div className="letter-content">
          {/* Letter Header */}
          <div
            className={`relative p-6 rounded-2xl bg-gradient-to-r ${selectedLetter.color} text-white mb-6`}
          >
            <button
              onClick={closeLetter}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <span className="text-xl">🔒</span>
            </button>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">{selectedLetter.icon}</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold">Open When...</h4>
                <h3 className="text-xl font-semibold">
                  {selectedLetter.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Letter Content */}
          <div className={`${selectedLetter.bgColor} p-6 rounded-2xl mb-6`}>
            <div className="relative">
              {/* Paper texture */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 viewBox=%220%200%20100%20100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z%22 fill=%22%239C92AC%22 fill-opacity=%220.1%22 fill-rule=%22evenodd%22/%3E%3C/svg%3E')] opacity-10 rounded-xl"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="border-l-4 border-pink-500 pl-4 mb-4">
                  <p className="text-gray-500 text-sm">Untuk cintaku,</p>
                </div>

                <div className="whitespace-pre-line text-gray-700 leading-relaxed text-lg font-comic">
                  {selectedLetter.content}
                </div>

                <div className="mt-8 pt-4 border-t border-gray-300">
                  <p className="text-gray-600">Dengan cinta yang selalu,</p>
                  <p className="text-xl font-bold text-pink-600 mt-1">
                    Your Special Person ❤️
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => {
                const currentIndex = letters.findIndex(
                  (l) => l.id === selectedLetter.id
                );
                const prevIndex =
                  currentIndex > 0 ? currentIndex - 1 : letters.length - 1;
                openLetter(letters[prevIndex]);
              }}
              className="btn-secondary flex items-center"
            >
              <span className="mr-2">⬅️</span>
              Surat Sebelumnya
            </button>

            <button
              onClick={closeLetter}
              className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center"
            >
              <span className="mr-2">📂</span>
              Kembali ke Daftar
            </button>

            <button
              onClick={() => {
                const currentIndex = letters.findIndex(
                  (l) => l.id === selectedLetter.id
                );
                const nextIndex =
                  currentIndex < letters.length - 1 ? currentIndex + 1 : 0;
                openLetter(letters[nextIndex]);
              }}
              className="btn-primary flex items-center"
            >
              Surat Selanjutnya
              <span className="ml-2">➡️</span>
            </button>
          </div>
        </div>
      ) : (
        // Letters Grid
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {letters.map((letter) => (
              <button
                key={letter.id}
                onClick={() => openLetter(letter)}
                className={`${
                  letter.bgColor
                } p-5 rounded-2xl text-left transition-all hover:scale-105 hover:shadow-xl border-2 ${
                  openedLetters.includes(letter.id)
                    ? "border-green-500"
                    : "border-transparent"
                } ${envelopeAnimation ? "animate-pulse" : ""}`}
              >
                <div className="flex items-start mb-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${letter.color} flex items-center justify-center mr-3`}
                  >
                    <span className="text-2xl">{letter.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{letter.title}</h4>
                    <div
                      className={`inline-flex items-center mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                        openedLetters.includes(letter.id)
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {openedLetters.includes(letter.id) ? (
                        <>
                          <span className="mr-1">🔓</span>
                          Telah dibuka
                        </>
                      ) : (
                        <>
                          <span className="mr-1">🔒</span>
                          Belum dibuka
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Klik untuk membaca surat khusus ini...
                </p>
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <button
              onClick={getRandomUnopenedLetter}
              className="btn-primary flex items-center"
            >
              <span className="text-xl mr-2">🎲</span>
              Buka Surat Acak
            </button>

            <button
              onClick={openAllLetters}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center"
            >
              <span className="text-xl mr-2">📬</span>
              Buka Semua Surat
            </button>

            <button
              onClick={resetLetters}
              className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center"
            >
              <span className="text-xl mr-2">🔄</span>
              Reset Semua Surat
            </button>
          </div>
        </>
      )}

      {/* Stats & Instructions */}
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">📊</span>
              Statistik Surat
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Surat:</span>
                <span className="font-bold">{letters.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Telah Dibuka:</span>
                <span className="font-bold text-green-600">
                  {openedLetters.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Masih Tertutup:</span>
                <span className="font-bold text-amber-600">
                  {letters.length - openedLetters.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Progress:</span>
                <span className="font-bold text-blue-600">
                  {Math.round((openedLetters.length / letters.length) * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-white p-4 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center">
              <span className="mr-2">💡</span>
              Cara Menggunakan
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-pink-500 mt-1 mr-2 flex-shrink-0"></div>
                <span>Buka surat ketika sesuai dengan kondisimu</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-purple-500 mt-1 mr-2 flex-shrink-0"></div>
                <span>Setiap surat berisi pesan spesial untukmu</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-blue-500 mt-1 mr-2 flex-shrink-0"></div>
                <span>Kamu bisa membaca ulang kapan saja</span>
              </li>
              <li className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-green-500 mt-1 mr-2 flex-shrink-0"></div>
                <span>Surat akan tetap tersimpan untukmu</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Special Message */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-3 rounded-2xl">
          <span className="text-xl mr-2">❤️</span>
          <p className="text-gray-700">
            Surat-surat ini ditulis dengan penuh cinta. Buka sesuai kebutuhan
            hatimu ❤️
          </p>
        </div>
      </div>

      {/* Achievement */}
      {openedLetters.length === letters.length && (
        <div className="mt-4 animate-pulse">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-xl text-center">
            <div className="text-2xl mb-2">🏆 SELAMAT! 🏆</div>
            <p className="font-bold">Anda telah membuka semua surat!</p>
            <p className="text-sm opacity-90">
              Anda adalah Letter Master! 💌👑
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OpenWhenLetters