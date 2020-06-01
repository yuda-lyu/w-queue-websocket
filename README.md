# w-runqws
An operator for websocket in nodejs and browser.

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![npm version](http://img.shields.io/npm/v/w-runqws.svg?style=flat)](https://npmjs.org/package/w-runqws) 
[![Build Status](https://travis-ci.org/yuda-lyu/w-runqws.svg?branch=master)](https://travis-ci.org/yuda-lyu/w-runqws) 
[![license](https://img.shields.io/npm/l/w-runqws.svg?style=flat)](https://npmjs.org/package/w-runqws) 
[![gzip file size](http://img.badgesize.io/yuda-lyu/w-runqws/master/dist/w-runqws-server.umd.js.svg?compression=gzip)](https://github.com/yuda-lyu/w-runqws)
[![npm download](https://img.shields.io/npm/dt/w-runqws.svg)](https://npmjs.org/package/w-runqws) 
[![jsdelivr download](https://img.shields.io/jsdelivr/npm/hm/w-runqws.svg)](https://www.jsdelivr.com/package/npm/w-runqws)

## Documentation
To view documentation or get support, visit [docs](https://yuda-lyu.github.io/w-runqws/WRunqwsServer.html).

## Parts
`w-runqws` includes 2 parts: 
* `w-runqws-server`: for nodejs server
* `w-runqws-client`: for nodejs and browser client

## Installation
### Using npm(ES6 module):
> **Note:** `w-runqws-server` depends on `ws`, `events`, `w-converws` and `w-orm-mongodb`.

> **Note:** `w-runqws-client` depends on `w-websocket-client` and `w-converws`.

```alias
npm i w-runqws
```
#### Example for w-runqws-server:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-runqws/blob/master/srv.mjs)]
```alias
import WRunqwsServer from 'w-runqws/dist/w-runqws-server.umd.js'

let opt = {
    mongoUrl: 'mongodb://username:password@127.0.0.1:27017',
    mongoDb: 'wqws',
    mongoCl: 'queues',
    port: 8080,
    authenticate: async function(token) {
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

    // //show eventNames from events.EventEmitter
    // setInterval(() => {
    //     console.log('eventNames:')
    //     _.each(wo.eventNames(), function(v) {
    //         console.log('    ', v, wo.listenerCount(v))
    //     })
    //     console.log('')
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
```
#### Example for w-runqws-client:
> Consumer, **Link:** [[dev source code](https://github.com/yuda-lyu/w-runqws/blob/master/scl-c1p0-cm.mjs)]
> 
`Consumer` gets missions from `Producer`, and handles each queue.
```alias
import WRunqwsClient from 'w-runqws/dist/w-runqws-client.umd.js'

let opt = {
    url: 'ws://localhost:8080',
    token: '*',
    takeNumLimit: 1, //0 for non-blocking, 1~n for blocking and need to call cb() in queueChange
}

let missionTopic = 'parser|texts'

//new
let wo = new WRunqwsClient(opt)

wo.on('open', function() {
    console.log('client nodejs[port:8080]: open')

    // //delQueueByTopic
    // wo.delQueueByTopic(missionTopic)
    //     .then(function(msg) {
    //         console.log('delQueueByTopic', msg)
    //     })

    //subTopic
    wo.subTopic(missionTopic)

})
wo.on('openOnce', function() {
    console.log('client nodejs[port:8080]: openOnce')
})
wo.on('close', function() {
    console.log('client nodejs[port:8080]: close')
})
wo.on('error', function(err) {
    console.log('client nodejs[port:8080]: error', err)
})
wo.on('reconn', function() {
    console.log('client nodejs[port:8080]: reconn')
})
wo.on('broadcast', function(data) {
    console.log('client nodejs[port:8080]: broadcast', data)
})
wo.on('deliver', function(data) {
    //console.log('client nodejs[port:8080]: deliver', data)
})
wo.on('queueChange', function(topic, id, input, output, state, cb) {
    //console.log('client nodejs[port:8080]: queueChange', topic, id, input, output, state, cb)

    //ready queue
    if (topic === missionTopic && state === 'ready') {
        console.log('queueChange', input, output, state)

        setTimeout(function() {

            //output
            output = 'done(' + input.replace('#', '') + ')'

            //state
            state = 'finish'

            //modifyQueue
            wo.modifyQueue(topic, id, input, output, state)

            //cb
            console.log('queueChange done', input, output, state)
            cb()

        }, 1000)

    }
    else {

        //cb
        //console.log('queueChange skip', input, output, state)
        cb()

    }

})


// blocking, takeNumLimit=1
// queueChange #1 null ready
// queueChange done #1 done(1) finish
// queueChange #2 null ready
// queueChange done #2 done(2) finish
// queueChange #3 null ready
// queueChange done #3 done(3) finish
// queueChange #4 null ready
// queueChange done #4 done(4) finish
// queueChange #5 null ready
// queueChange done #5 done(5) finish
// queueChange #6 null ready
// queueChange done #6 done(6) finish
// queueChange #7 null ready
// queueChange done #7 done(7) finish
// queueChange #8 null ready
// queueChange done #8 done(8) finish
// queueChange #9 null ready
// queueChange done #9 done(9) finish
// queueChange #10 null ready
// queueChange done #10 done(10) finish


// blocking, takeNumLimit=2
// queueChange #1 null ready
// queueChange #2 null ready
// queueChange done #1 done(1) finish
// queueChange #3 null ready
// queueChange done #2 done(2) finish
// queueChange #4 null ready
// queueChange done #3 done(3) finish
// queueChange #5 null ready
// queueChange done #4 done(4) finish
// queueChange #6 null ready
// queueChange done #5 done(5) finish
// queueChange #7 null ready
// queueChange done #6 done(6) finish
// queueChange #8 null ready
// queueChange done #7 done(7) finish
// queueChange #9 null ready
// queueChange done #8 done(8) finish
// queueChange #10 null ready
// queueChange done #9 done(9) finish
// queueChange done #10 done(10) finish


// non-blocking, takeNumLimit=0
// queueChange #1 null ready
// queueChange #2 null ready
// queueChange #3 null ready
// queueChange #4 null ready
// queueChange #5 null ready
// queueChange #6 null ready
// queueChange #7 null ready
// queueChange #8 null ready
// queueChange #9 null ready
// queueChange #10 null ready
// queueChange done #1 done(1) finish
// queueChange done #2 done(2) finish
// queueChange done #3 done(3) finish
// queueChange done #4 done(4) finish
// queueChange done #5 done(5) finish
// queueChange done #6 done(6) finish
// queueChange done #7 done(7) finish
// queueChange done #8 done(8) finish
// queueChange done #9 done(9) finish
// queueChange done #10 done(10) finish
```
> Producer, **Link:** [[dev source code](https://github.com/yuda-lyu/w-runqws/blob/master/scl-c1p0-pd.mjs)]

`Producer` sends missions to `Consumer`.
```alias
import WRunqwsClient from 'w-runqws/dist/w-runqws-client.umd.js'

let opt = {
    url: 'ws://localhost:8080',
    token: '*',
    //takeNumLimit: 0, //no restrictions required for producer
}

let missionTopic = 'parser|texts'

//new
let wo = new WRunqwsClient(opt)

wo.on('open', function() {
    console.log('client nodejs[port:8080]: open')

    //subTopic
    wo.subTopic(missionTopic)

    function addMission(n) {

        //input
        let input = '#' + n

        //option
        let option = {}

        //pushQueue
        wo.pushQueue(missionTopic, input, option)

    }

    //mission
    let n = 0
    let t = setInterval(function() {
        n += 1
        addMission(n)
        if (n === 10) {
            clearInterval(t)
        }
    }, 20)

})
wo.on('openOnce', function() {
    console.log('client nodejs[port:8080]: openOnce')
})
wo.on('close', function() {
    console.log('client nodejs[port:8080]: close')
})
wo.on('error', function(err) {
    console.log('client nodejs[port:8080]: error', err)
})
wo.on('reconn', function() {
    console.log('client nodejs[port:8080]: reconn')
})
wo.on('broadcast', function(data) {
    console.log('client nodejs[port:8080]: broadcast', data)
})
wo.on('deliver', function(data) {
    //console.log('client nodejs[port:8080]: deliver', data)
})
wo.on('queueChange', function(topic, id, input, output, state) {
    //console.log('client nodejs[port:8080]: queueChange', topic, id, input, output, state)
})
```

#### In a complicated situation:
> Consumer, **Link:** [[dev source code](https://github.com/yuda-lyu/w-runqws/blob/master/scl-c2p1-cm.mjs)]

> Producer, **Link:** [[dev source code](https://github.com/yuda-lyu/w-runqws/blob/master/scl-c2p1-pd.mjs)]

1. `Producer` sends missions to `Consumer`.
2. `Consumer` handles each queue.
3. `Consumer` produces the other result(for combination e.g.), and saves it in a queue.
4. `Producer` gets results from the queue.
5. `Producer` removes queues in database.

### In a browser(UMD module):
> **Note:** `w-runqws-client` does't depend on any package.

[Necessary] Add script for w-runqws-client.
```alias
<script src="https://cdn.jsdelivr.net/npm/w-runqws@1.0.21/dist/w-runqws-client.umd.js"></script>
```
#### Example for w-runqws-client:
> Consumer, **Link:** [[dev source code](https://github.com/yuda-lyu/w-runqws/blob/master/web-c1p0-cm.html)]
> 
`Consumer` gets missions from `Producer`, and handles each queue.
```alias
let opt = {
    url: 'ws://localhost:8080',
    token: '*',
    takeNumLimit: 1, //0 for non-blocking, 1~n for blocking and need to call cb() in queueChange
}

let missionTopic = 'parser|texts'

//new
let WRunqwsClient = window['w-runqws-client']
let wo = new WRunqwsClient(opt)

wo.on('open', function() {
    console.log('client web: open')

    // //delQueueByTopic
    // wo.delQueueByTopic(missionTopic)
    //     .then(function(msg) {
    //         console.log('delQueueByTopic', msg)
    //     })

    //subTopic
    wo.subTopic(missionTopic)

})
wo.on('openOnce', function() {
    console.log('client web: openOnce')
})
wo.on('close', function() {
    console.log('client web: close')
})
wo.on('error', function(err) {
    console.log('client web: error', err)
})
wo.on('reconn', function() {
    console.log('client web: reconn')
})
wo.on('broadcast', function(data) {
    console.log('client web: broadcast', data)
})
wo.on('deliver', function(data) {
    //console.log('client web: deliver', data)
})
wo.on('queueChange', function(topic, id, input, output, state, cb) {
    //console.log('client web: queueChange', topic, id, input, output, state, cb)

    //ready queue
    if (topic === missionTopic && state === 'ready') {
        console.log('queueChange', input, output, state)

        setTimeout(function() {

            //output
            output = 'done(' + input.replace('#', '') + ')'

            //state
            state = 'finish'

            //modifyQueue
            wo.modifyQueue(topic, id, input, output, state)

            //cb
            console.log('queueChange done', input, output, state)
            cb()

        }, 1000)

    }
    else {

        //cb
        //console.log('queueChange skip', input, output, state)
        cb()

    }

})


// blocking, takeNumLimit=1
// queueChange #1 null ready
// queueChange done #1 done(1) finish
// queueChange #2 null ready
// queueChange done #2 done(2) finish
// queueChange #3 null ready
// queueChange done #3 done(3) finish
// queueChange #4 null ready
// queueChange done #4 done(4) finish
// queueChange #5 null ready
// queueChange done #5 done(5) finish
// queueChange #6 null ready
// queueChange done #6 done(6) finish
// queueChange #7 null ready
// queueChange done #7 done(7) finish
// queueChange #8 null ready
// queueChange done #8 done(8) finish
// queueChange #9 null ready
// queueChange done #9 done(9) finish
// queueChange #10 null ready
// queueChange done #10 done(10) finish


// blocking, takeNumLimit=2
// queueChange #1 null ready
// queueChange #2 null ready
// queueChange done #1 done(1) finish
// queueChange #3 null ready
// queueChange done #2 done(2) finish
// queueChange #4 null ready
// queueChange done #3 done(3) finish
// queueChange #5 null ready
// queueChange done #4 done(4) finish
// queueChange #6 null ready
// queueChange done #5 done(5) finish
// queueChange #7 null ready
// queueChange done #6 done(6) finish
// queueChange #8 null ready
// queueChange done #7 done(7) finish
// queueChange #9 null ready
// queueChange done #8 done(8) finish
// queueChange #10 null ready
// queueChange done #9 done(9) finish
// queueChange done #10 done(10) finish


// non-blocking, takeNumLimit=0
// queueChange #1 null ready
// queueChange #2 null ready
// queueChange #3 null ready
// queueChange #4 null ready
// queueChange #5 null ready
// queueChange #6 null ready
// queueChange #7 null ready
// queueChange #8 null ready
// queueChange #9 null ready
// queueChange #10 null ready
// queueChange done #1 done(1) finish
// queueChange done #2 done(2) finish
// queueChange done #3 done(3) finish
// queueChange done #4 done(4) finish
// queueChange done #5 done(5) finish
// queueChange done #6 done(6) finish
// queueChange done #7 done(7) finish
// queueChange done #8 done(8) finish
// queueChange done #9 done(9) finish
// queueChange done #10 done(10) finish
```
> Producer, **Link:** [[dev source code](https://github.com/yuda-lyu/w-runqws/blob/master/web-c1p0-pd.html)]

`Producer` sends missions to `Consumer`.
```alias
let opt = {
    url: 'ws://localhost:8080',
    token: '*',
    //takeNumLimit: 0, //no restrictions required for producer
}

let missionTopic = 'parser|texts'

//new
let WRunqwsClient = window['w-runqws-client']
let wo = new WRunqwsClient(opt)

wo.on('open', function() {
    console.log('client web: open')

    //subTopic
    wo.subTopic(missionTopic)

    function addMission(n) {

        //input
        let input = '#' + n

        //option
        let option = {}

        //pushQueue
        wo.pushQueue(missionTopic, input, option)

    }

    //mission
    let n = 0
    let t = setInterval(function() {
        n += 1
        addMission(n)
        if (n === 10) {
            clearInterval(t)
        }
    }, 20)

})
wo.on('openOnce', function() {
    console.log('client web: openOnce')
})
wo.on('close', function() {
    console.log('client web: close')
})
wo.on('error', function(err) {
    console.log('client web: error', err)
})
wo.on('reconn', function() {
    console.log('client web: reconn')
})
wo.on('broadcast', function(data) {
    console.log('client web: broadcast', data)
})
wo.on('deliver', function(data) {
    //console.log('client web: deliver', data)
})
wo.on('queueChange', function(topic, id, input, output, state) {
    //console.log('client web: queueChange', topic, id, input, output, state)
})
```
