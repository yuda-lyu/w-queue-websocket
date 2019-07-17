import WRunqwsClient from './src/WRunqwsClient.mjs'
//import WRunqwsClient from './dist/w-runqws-client.umd.js'
import genID from 'wsemi/src/genID.mjs'

//client: Producer

let opt = {
    url: 'ws://localhost:8080',
    token: '*',
}

let missionTopic = 'merge|texts'

//new
let wo = new WRunqwsClient(opt)

wo.on('open', function() {
    console.log('client nodejs[port:8080]: open')

    //pid
    let pid = genID()

    //subTopic
    wo.subTopic(missionTopic)

    function addMission(n, num) {

        //input
        let input = {
            pid: pid,
            label: '#' + String.fromCharCode(n + 64),
            n: n,
            num: num
        }

        //option
        let option = {}

        //pushQueue
        wo.pushQueue(missionTopic, input, option)

    }

    //mission
    let n = 0
    let num = 26
    let t = setInterval(function() {
        n += 1
        addMission(n, num)
        if (n === num) {
            clearInterval(t)
        }
    }, 1)

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

    //finish queue
    if (topic === missionTopic && state === 'finish') {

        //show result
        console.log('result: ', output.result)

        //getQueueByTopic
        wo.getQueueByTopic(missionTopic)
            .then(function(qs) {
                //console.log('getQueueByTopic', qs)
                let r = qs.map(function(q) {
                    return q.input
                })
                console.log(r)
            })

        //delay 1s
        setTimeout(function() {

            //delQueueByIDs
            wo.delQueueByIDs(output.ids)
                .then(function(msg) {
                    console.log('delQueueByIDs', msg)
                })

        }, 1000)

    }

})
