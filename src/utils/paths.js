// Utility untuk handle paths di development vs production
export const getAssetPath = (relativePath) => {
  // Jika di production (GitHub Pages), tambah base path
  if (import.meta.env.PROD) {
    // Ambil base path dari vite.config.js atau environment
    const basePath = import.meta.env.BASE_URL || "/happy-birthday-website/";
    return `${basePath}${
      relativePath.startsWith("/") ? relativePath.slice(1) : relativePath
    }`;
  }
  // Jika di development, pakai path normal
  return relativePath;
};

// Untuk images
export const getImagePath = (imageName) => {
  return getAssetPath(`/images/${imageName}`);
};

// Untuk audio
export const getAudioPath = (audioName) => {
  return getAssetPath(`/audio/${audioName}`);
};

// Untuk public assets lainnya
export const getPublicPath = (path) => {
  return getAssetPath(path);
};
