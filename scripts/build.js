// build.js
const { build } = require('esbuild');
const sveltePlugin = require('esbuild-svelte');
const sveltePreprocess = require('svelte-preprocess');

const isProdBuild = process.argv.includes('--prod');

main();

async function main() {
  const commonConfig = {
    outbase: './src',
    platform: 'browser',
    external: [],
    bundle: true,
    sourcemap: !isProdBuild,
    minify: isProdBuild,
    drop: isProdBuild ? ['console'] : undefined
  };
  
  const contentJob = build({
    ...commonConfig,
    entryPoints: ['./src/content.js'],
    outfile: './dist/content.js'
  });

  const backgroundJob = build({
    ...commonConfig,
    entryPoints: ['./src/background.js'],
    outfile: './dist/background.js'
  });

  const popupJob = build({
    ...commonConfig,
    entryPoints: ['./src/popup/popup.js'],
    outbase: './src/popup',
    outdir: './dist',
    mainFields: ['svelte', 'module', 'main', 'browser'],
    plugins: [
      sveltePlugin({
        preprocess: sveltePreprocess()
      })
    ]
  });

  const settingsJob = build({
    ...commonConfig,
    entryPoints: ['./src/settings/settings.js'],
    outbase: './src/settings',
    outdir: './dist',
    mainFields: ['svelte', 'module', 'main', 'browser'],
    plugins: [
      sveltePlugin({
        preprocess: sveltePreprocess()
      })
    ]
  });

  return Promise.all([contentJob, backgroundJob, popupJob, settingsJob]).then(
    () => console.log('⚡ Compiled')
  );
}