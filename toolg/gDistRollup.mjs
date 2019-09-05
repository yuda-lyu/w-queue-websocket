import rollupFiles from 'w-package-tools/src/rollupFiles.mjs'
import getFiles from 'w-package-tools/src/getFiles.mjs'


let fdSrc = './src'
let fdTar = './dist'


rollupFiles({
    fns: getFiles(fdSrc),
    fdSrc,
    fdTar,
    nameDistType: 'kebabCase',
    globals: {
        'ws': 'ws',
        'events': 'events',
        'mongodb': 'mongodb',
        'stream': 'stream',
    },
    external: [
        'ws',
        'events',
        'mongodb',
        'stream',
    ],
})

