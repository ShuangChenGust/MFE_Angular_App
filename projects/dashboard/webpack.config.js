// const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// module.exports = withModuleFederationPlugin({

//   name: 'dashboard',

//   exposes: {
//     './Component': './projects/dashboard/src/app/app.component.ts',
//   },

//   shared: {
//     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
//   },

// });
const {
  withModuleFederation,
} = require("@angular-architects/module-federation/webpack");
const path = require("path");

module.exports = withModuleFederation({
  name: "dashboard",
  filename: "remoteEntry.js",
  devServer: {
    port: 4202, // Ensure this is the correct port
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  exposes: {
    "./Component": "./src/app/app.component.ts",
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true },
    "@angular/common": { singleton: true, strictVersion: true },
    "@angular/router": { singleton: true, strictVersion: true },
    "shared/src/app/services/todo.service": { singleton: true },
  },
});
