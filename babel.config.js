module.exports = {
  presets: ['module:@react-native/babel-preset'],

  plugins: ['react-native-reanimated/plugin',
    ["module:react-native-dotenv", {
      "modulName": "@env",
      "path": ".env",
      "safe": false,
      "allowUndefined": true,
      "blockList": null,
      "allowList": null,
      "verbose": false
    }],

    [
      'module-resolver',
      {
        root: ['./node_modules'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
      },
    ],
  ]
};
