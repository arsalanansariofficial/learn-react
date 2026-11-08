export default {
  turbopack: {
    rules: { '*.css': { loaders: ['@tailwindcss/turbopack'], as: '*.css' } }
  },
  partialPrefetching: true,
  cacheComponents: true,
  devIndicators: false
};
