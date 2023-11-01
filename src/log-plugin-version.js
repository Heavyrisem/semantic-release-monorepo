import { resolve } from 'path';
import { readPackage } from 'read-pkg';
import { createRequire } from 'node:module';

const newRequire = createRequire(import.meta.url);
const debug = newRequire('debug')('semantic-release:monorepo');

const logPluginVersion = type => plugin => async (pluginConfig, config) => {
  if (config.options.debug) {
    const { version } = await readPackage(resolve(__dirname, '../'));
    debug('Running %o version %o', type, version);
  }

  return plugin(pluginConfig, config);
};

export default logPluginVersion;
