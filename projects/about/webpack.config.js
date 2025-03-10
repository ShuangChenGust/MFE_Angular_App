const {
  withModuleFederation,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederation({
  name: "about",
  filename: "remoteEntry.json", // This is essential!
  exposes: {
    "./AboutModule": "./projects/about/src/app/about.module.ts",
  },
  shared: {
    "@angular/core": { singleton: true, strictVersion: true },
    "@angular/common": { singleton: true, strictVersion: true },
    "@angular/router": { singleton: true, strictVersion: true },
    "shared/src/app/services/todo.service": { singleton: true },
  },
});
