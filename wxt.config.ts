import { defineConfig } from 'wxt';
import pkg from './package.json';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    name: 'LinuxDo Scripts',
    version: pkg.version,
    description: '为 linux.do 用户提供了一些增强功能。',
    permissions: ['storage']
  },
  hooks: {
    'build:manifestGenerated': (wxt, manifest) => {
      if (wxt.config.command === 'serve') {
        manifest.content_scripts ??= [];
        manifest.content_scripts.push({
          matches: ['https://linux.do/*'],
          js: ['content-scripts/content.js'],
          css: ['content-scripts/content.css']
        });
      }
    }
  }
});
