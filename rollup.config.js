// rollup.config.js

export default {
  entry: 'src/cssobj-plugin-replace.js',
  moduleName: 'cssobj_plugin_replace',
  moduleId: 'cssobj_plugin_replace',
  targets: [
    { format: 'iife', dest: 'dist/cssobj-plugin-replace.iife.js' },
    { format: 'amd',  dest: 'dist/cssobj-plugin-replace.amd.js'  },
    { format: 'cjs',  dest: 'dist/cssobj-plugin-replace.cjs.js'  },
    { format: 'es',   dest: 'dist/cssobj-plugin-replace.es.js'   }
  ]
}
