import WRunqwsClient from './src/WRunqwsClient.mjs'
//import WRunqwsClient from './dist/w-runqws-client.umd.js'

//client: Producer

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

//node --experimental-modules --es-module-specifier-resolution=node scl-c1p0-pd.mjs
