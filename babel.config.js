module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // plugins: ["nativewind/babel"],
  plugins: ['react-native-reanimated/plugin',
    "nativewind/babel",
    ["module:react-native-dotenv", {
      "modulName": "@env",
      "path": ".env",
      "safe": false,
      "allowUndefined": true,
      "blockList": null,
      "allowList": null,
      "verbose": false
    }],
  ]
};
