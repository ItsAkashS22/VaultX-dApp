import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import rollupNodePolyFill from 'rollup-packages-polyfill-core';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE_URL || '/';

  return {
    base,

    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_PORT || 5173),
      strictPort: false,
      open: false,
      cors: true,
      allowedHosts: true,
      hmr: {
        clientPort: Number(env.VITE_HMR_CLIENT_PORT || 443),
      },
    },

    preview: {
      host: '0.0.0.0',
      port: Number(env.VITE_PREVIEW_PORT || 4173),
      strictPort: false,
      allowedHosts: true,
    },

    plugins: [
      react({
        jsxImportSource: 'react',
        tsDecorators: true,
        swcOptions: {
          jsc: {
            transform: {
              react: { runtime: 'automatic' }
            }
          }
        }
      })
    ],

    define: {
      'process.env': {
        VITE_DCL_DEFAULT_ENV: env.VITE_DCL_DEFAULT_ENV,
        VITE_BASE_URL: base
      },
      global: 'globalThis'
    },

    resolve: {
      alias: {
        '@web3-react/core': '/src/web3/Web3ReactCompat.jsx',
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        buffer: 'buffer',
        util: 'util',
        assert: 'assert',
        process: 'process/browser',

        assets: '/src/assets',
        components: '/src/components',
        containers: '/src/containers',
        contracts: '/src/contracts',
        helpers: '/src/helpers',
        hooks: '/src/hooks',
        providers: '/src/providers'
      }
    },

    optimizeDeps: {
      include: [
        'buffer',
        'process',
        'crypto-browserify',
        'stream-browserify'
      ],

      esbuildOptions: {
        define: { global: 'globalThis' },
        plugins: [
          NodeGlobalsPolyfillPlugin({ process: true, buffer: true }),
          NodeModulesPolyfillPlugin()
        ]
      }
    },

    build: {
      sourcemap: false,
      rollupOptions: {
        plugins: [rollupNodePolyFill()]
      }
    }
  };
});
