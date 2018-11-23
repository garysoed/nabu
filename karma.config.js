module.exports = function(config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      {pattern: "out/bundle.js", watched: true, included: true},
      {pattern: "out/bundle.js.map", watched: true, included: false},
    ],
    exclude: [
    ],
    preprocessors: {
    },
    plugins: [
      require("karma-jasmine"),
      require("karma-sourcemap-loader"),
      require("karma-summary-reporter"),
    ],
    port: 8888,
    reporters: ["summary"],
    summaryReporter: {
      show: 'all',
      // specLength: 50,
      // Show an 'all' column as a summary
      // overviewColumn: true
    },
    singleRun: false
  });
};
