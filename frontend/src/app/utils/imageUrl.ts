export const getImageUrl = (imagePath?: string | null): string => {
  if (!imagePath) return '';

  // Return unchanged for full URLs and browser File preview blobs
  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('blob:')
  ) {
    return imagePath;
  }

  // Prepend Laravel backend origin for relative paths
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `http://127.0.0.1:8000${cleanPath}`;
};