module.exports = {
  "extends": [
    "google",
  ],
  "parserOptions": {
    "ecmaVersion": 2017,
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "guard-for-in": 1,
    "max-len": 1,
    "comma-dangle": ["error", "never"],
    "require-jsdoc": 0
  }
};