const normalizeUrl = (url: string): string => {
  const trimmed = url.trim().replace(/\/+$/, '');
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export const config = {
  port: Number(process.env.PORT || 3001),
  env: process.env.NODE_ENV || 'development',
  productionUrl: normalizeUrl(process.env.PRODUCTION_URL || 'https://hbsp-locations-erpyanpo.vercel.app'),
  cors: {
    origins: process.env.CORS_ORIGIN?.split(',').map(o => o.trim()) || ['*']
  }
} as const;
