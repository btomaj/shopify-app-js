import {spawn} from 'child_process';
import path from 'path';

import '..';

import '../../../runtime/__tests__/all.test';
import {runTests, E2eTestEnvironment} from '../../__e2etests__/e2e-runner.test';

const cfWorkerAppPort = '7777';
// This value must match the one in ./wrangler.toml
const dummyServerPort = '7778';

const workerEnvironment: E2eTestEnvironment = {
  name: 'CF Worker',
  domain: `http://localhost:${cfWorkerAppPort}`,
  dummyServerPort,
  process: spawn(
    'pnpm',
    [
      'wrangler',
      'dev',
      '-c',
      path.join(__dirname, './wrangler.toml'),
      '--port',
      `${cfWorkerAppPort}`,
      '--inspector-port',
      '9249',
      'bundle/test-web-api-app.mjs',
    ],
    {
      detached: true,
      stdio: process.env.SHOPIFY_E2E_TEST_DEBUG ? 'inherit' : undefined, // eslint-disable-line no-process-env
    },
  ),
  testable: true,
  ready: false,
};

runTests(workerEnvironment);
