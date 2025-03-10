const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "shell",

  exposes: {
    "./Component": "./projects/shell/src/app/app.component.ts",
  },
  remotes: {
    dashboard: "dashboard@http://localhost:4202/remoteEntry.js",
    todo: "todo@http://localhost:4201/remoteEntry.js",
    about: "about@http://localhost:4203/remoteEntry.js",
    profile: "profile@http://localhost:4204/remoteEntry.js",
  },
  output: {
    publicPath: "auto", // Ensure this is set correctly
  },
  shared: {
    "shared/src/app/services/todo.service": { singleton: true },
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
