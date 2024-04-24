module.exports = function (api) {
  api.cache(true);
  return {
    // presets: ["babel-preset-expo"],
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
