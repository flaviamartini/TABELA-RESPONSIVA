module.exports = {
    testMatch: ['**/*.test.tsx'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
        "ts-jest": {
          "tsconfig": "tsconfig.json",
          "babelConfig": true
        }
      }
    };

  