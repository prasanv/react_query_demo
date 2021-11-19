// next.config.js
module.exports = {
  webpack: config => {
     config.resolve.mainFields = ["main", "browser", "module"];
     return config;
  },
  reactStrictMode: true,
};