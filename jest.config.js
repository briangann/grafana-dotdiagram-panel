
module.exports = {
    "transform": {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.js$": "./node_modules/babel-jest"
    },
    "testRegex": "(\\.|/)(spec|test|jest)\\.(jsx?|tsx?)$",
    "roots": [
      "src"
    ],  
    "moduleDirectories": [
      "node_modules",
      "src",
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
};
