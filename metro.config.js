const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'), // Đường dẫn đến transformer cho SVG
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'), // Loại bỏ SVG khỏi assetExts
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'], // Thêm SVG vào sourceExts
  },
};

module.exports = mergeConfig(defaultConfig, config);
