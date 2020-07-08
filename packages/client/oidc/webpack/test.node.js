"use strict";

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

const vars = require("./vars");

// START Source: Create React App
// https://github.com/facebook/create-react-app/packages/react-scripts/config/webpack.config.dev.js

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve("style-loader"),
    {
      loader: require.resolve("css-loader"),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve("postcss-loader"),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: "postcss",
        plugins: () => [
          /* eslint-disable-next-line global-require */
          require("postcss-flexbugs-fixes"),
          /* eslint-disable-next-line global-require */
          require("postcss-preset-env")({
            /* eslint-disable-line global-require */
            autoprefixer: {
              flexbox: "no-2009",
            },
            stage: 3,
          }),
        ],
      },
    },
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};
// END Source: Create React App

module.exports = {
  context: path.resolve(__dirname, "../test"),
  entry: {
    app: "./integration/index.test.js",
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "../src"),
          path.resolve(__dirname, "../test/integration"),
        ],
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          emitWarning: true,
          emitError: true,
          failOnWarning: true,
          failOnError: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "../src"),
          path.resolve(__dirname, "../test/integration"),
        ],
        use: {
          loader: "babel-loader",
          options: {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            cacheCompression: true,
            compact: true,
          },
        },
      },
      // START Source: Create React App
      // https://github.com/facebook/create-react-app/packages/react-scripts/config/webpack.config.dev.js
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            // exclude: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            // loader: require.resolve("null-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
          // END Source: Create React App

          // START Source: Create React App
          // https://github.com/facebook/create-react-app/packages/react-scripts/config/webpack.config.dev.js
          // Custom - Support camelCase in CSS loader

          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          // By default we support CSS Modules with the extension .module.css
          {
            test: vars.cssRegex,
            exclude: vars.cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              localsConvention: "camelCase",
            }),
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: vars.cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              localsConvention: "camelCase",
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            }),
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve("file-loader"),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            // Custom - Support semantic-ui-less exclude files (.config. .overrides .variables)
            // Custom - Support HtmlWebpackTemplate exclude files (.ejs) ??? TODO confirm
            exclude: [
              /\.(js|mjs|jsx|ts|tsx)$/,
              /\.html$/,
              /\.json$/,
              /\.config$/,
              /\.overrides$/,
              /\.variables$/,
              /\.ejs$/,
            ],
            options: {
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  },
  target: "node",
  externals: [nodeExternals()],
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: true,
    }),
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../../../build/ui/test_build_node"),
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /\.js$/,
      filename: "[name].bundle.js.map",
      moduleFilenameTemplate: "[absolute-resource-path]",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../../../build/ui/test_build_node"),
  },
};
