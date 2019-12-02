/* eslint-env node */
class WebpackWatchRunPlugin {
  constructor(options) {
    if (typeof options !== 'object') {
      options = {};
    }
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.watchRun.tap('WatchRun', comp => {
      const changedTimes = comp.watchFileSystem.watcher.mtimes;
      const changedFiles = Object.keys(changedTimes)
        .map(file => `\n  ${file}`)
        .join('');

      if (changedFiles.length) {
        console.log('------------------------------');
        console.log('New build files changed:', changedFiles);
        console.log('------------------------------');
      }
    });
  }
}

module.exports = WebpackWatchRunPlugin;
