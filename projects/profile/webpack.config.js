const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "profile",

  exposes: {
    "./Component": "./projects/profile/src/app/app.component.ts",
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
