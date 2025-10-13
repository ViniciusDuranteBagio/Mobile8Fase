const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Desabilitar source maps para evitar erros de anonymous
config.transformer = {
  ...config.transformer,
  minifierPath: require.resolve('metro-minify-terser'),
  minifierConfig: {
    keep_fnames: true,
    mangle: {
      keep_fnames: true,
    },
  },
};

// Configuração mais robusta para evitar erros de symbolication
config.serializer = {
  ...config.serializer,
  getModulesRunBeforeMainModule: () => [],
};

// Configuração adicional para web
config.resolver = {
  ...config.resolver,
  alias: {
    // Evitar conflitos de source maps
    'react-native$': 'react-native-web',
  },
};

module.exports = config;