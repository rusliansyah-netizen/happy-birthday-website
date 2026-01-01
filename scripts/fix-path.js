const fs = require("fs");
const path = require("path");

const filesToFix = [
  "src/components/Gallery.jsx",
  "src/components/Landing.jsx",
  "src/components/HeartRain.jsx",
  "src/components/VirtualBalloons.jsx",
  "src/components/InteractiveCake.jsx",
];

const repoName = "happy-birthday-website"; // Ganti dengan nama repo Anda

filesToFix.forEach((file) => {
  const filePath = path.join(__dirname, "..", file);

  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf8");

    // Replace semua /images/ dengan path yang benar
    content = content.replace(
      /src="\/images\/([^"]+)"/g,
      `src="/${repoName}/images/$1"`
    );

    // Replace semua /audio/ dengan path yang benar
    content = content.replace(
      /src="\/audio\/([^"]+)"/g,
      `src="/${repoName}/audio/$1"`
    );

    // Juga untuk background images di CSS-in-JS
    content = content.replace(
      /url\('\/images\/([^']+)'\)/g,
      `url('/${repoName}/images/$1')`
    );

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Fixed paths in ${file}`);
  }
});

console.log("\n🎯 Jangan lupa update:");
console.log('1. vite.config.js → base: "/repo-name/"');
console.log(
  '2. package.json → homepage: "https://username.github.io/repo-name"'
);
console.log("3. npm run build");
console.log("4. npm run deploy");
