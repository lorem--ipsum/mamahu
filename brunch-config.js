module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app\/)/,
        'app.js': /^src/
      }
    },
    stylesheets: {
      joinTo: 'app.css'
    }
  },

  paths: {
    watched: ['src']
  },

  conventions: {
    assets: function(path) {
      if (/\/$/.test(path)) {
        return path;
      }
      return /^src\/.*\.html/.test(path);
    }
  },

  plugins: {
    babel: {presets: ['es2015']},
    ng_annotate: {
      pattern: /^src/
    },
    autoprefixer: {
      browsers: [
        "last 2 version",
        "> 1%",
        "ie >= 9"
      ],
      cascade: false
    }
  }
};
