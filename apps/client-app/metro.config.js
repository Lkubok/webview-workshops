const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const symlinkResolver = require("@rnx-kit/metro-resolver-symlinks")();

// Get default Expo config
const config = getDefaultConfig(__dirname);

// Watch your shared packages folder
config.watchFolders = [
  path.resolve(__dirname, "../../packages"), // adjust if needed
];

// Use symlink resolver
config.resolver.resolveRequest = symlinkResolver;

module.exports = config;
