const reactComponents = require("@neutrinojs/react-components");
const jest = require("@neutrinojs/jest");
const typescript = require("neutrinojs-typescript");

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    typescript({
      tsconfig: {
        compilerOptions: {
          declaration: true,
          declarationMap: true, // defaults to true
        },
      },
    }),
    reactComponents(),
    jest(),
  ],
};
