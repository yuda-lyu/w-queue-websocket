import WRunqwsServer from './src/WRunqwsServer.mjs'
//import WRunqwsServer from './dist/w-runqws-server.umd.js'
//import _ from 'lodash'


let opt = {
    mongoUrl: 'mongodb://username:password@127.0.0.1:27017',
    mongoDb: 'wqws',
    mongoCl: 'queues',
    port: 8080,
    authenticate: async function(token) {
        //使用token驗證使用者身份
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(true)
            }, 1000)
        })
    },
}

//new
let wo = new WRunqwsServer(opt)

wo.on('open', function() {
    console.log(`Server running at: ws://localhost:${opt.port}`)

    // //broadcast
    // let n = 0
    // setInterval(() => {
    //     n += 1
    //     wo.broadcast(`server: broadcast: hi(${n})`)
    // }, 1000)

})
wo.on('error', function(err) {
    console.log(`Server[port:${opt.port}]: error`, err)
})
wo.on('clientChange', function(clients) {
    console.log(`Server[port:${opt.port}]: now clients: ${clients.length}`)
})
wo.on('execute', function(func, input, cb) {
    console.log(`Server[port:${opt.port}]: execute`, func, input)

    // if (func === 'add') {
    //     let r = input.p1 + input.p2
    //     cb(r)
    // }

})
wo.on('broadcast', function(data) {
    console.log(`Server[port:${opt.port}]: broadcast`, data)
})
wo.on('deliver', function(data) {
    console.log(`Server[port:${opt.port}]: deliver`, data)
})

//node --experimental-modules --es-module-specifier-resolution=node srv.mjs
