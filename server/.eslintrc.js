module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "babel"
  ],
  "rules": {
    "object-curly-spacing": ["warn", "never"],
    "func-names": "off",
    "space-before-function-paren": ["error", "never"],
    "max-len": ["error", 120, 4],
    "no-unused-vars": ["error", {"argsIgnorePattern": "next"}],
    "import/prefer-default-export": "off",
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "functions": "ignore"
    }],
    "import/no-extraneous-dependencies": [
    "error", {
       "devDependencies": true, 
       "optionalDependencies": false, 
       "peerDependencies": false, 
       "packageDir": "./"
    }],
    "no-unused-expressions": 0,
    "babel/no-unused-expressions": 2
  }
};