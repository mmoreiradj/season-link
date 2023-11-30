module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            common: './src/common',
            config: './src/config',
            services: './src/services',
            hooks: './src/hooks',
            store: './src/store',
          },
        },
      ],
    ],
  };
};
