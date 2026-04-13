const imageContext = require.context(
  '../assets/event-card-images',
  false,
  /\.(png|jpe?g|gif|webp|svg)$/i
);

const eventCardImages = imageContext.keys().reduce((acc, key) => {
  const fileName = key.replace('./', '');
  const asset = imageContext(key);
  const url = typeof asset === 'string' ? asset : asset.default;

  acc[fileName] = url;
  acc[fileName.toLowerCase()] = url;

  return acc;
}, {});

export function resolveEventCardImage(imageName) {
  if (typeof imageName !== 'string') {
    return null;
  }

  const normalized = imageName.trim().replace(/\\/g, '/');

  if (!normalized) {
    return null;
  }

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  if (normalized.startsWith('/')) {
    return encodeURI(normalized);
  }

  const baseName = normalized.split('/').pop();
  const assetName = /\.[a-z0-9]+$/i.test(baseName)
    ? baseName
    : `${baseName}.png`;

  return eventCardImages[assetName] || eventCardImages[assetName.toLowerCase()] || null;
}
