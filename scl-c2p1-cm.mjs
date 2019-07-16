import WRunqwsClient from './src/WRunqwsClient.mjs'
//import WRunqwsClient from './dist/w-runqws-client.umd.js'
import _ from 'lodash'

//client: Consumer

let opt = {
    url: 'ws://localhost:8080',
    token: '*',
}

let missionTopic = 'refs|texts'

let dtqs = {}

//new
let wo = new WRunqwsClient(opt)

wo.on('open', function() {
    console.log('client nodejs[port:8080]: open')

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
wo.on('queueChange', function(topic, id, input, output, state) {
    //console.log('client nodejs[port:8080]: queueChange', topic, id, input, output, state)
    console.log('queueChange', input, output, state)

    //ready queue
    if (topic === missionTopic && state === 'ready') {

        //pid
        let pid = input.pid

        //q
        let q = {
            topic,
            id,
            input,
            output: input.label.replace('#', ''),
            state,
        }

        //default
        if (!dtqs[pid]) {
            dtqs[pid] = {
                num: input.num,
                qs: []
            }
        }

        //save queue
        dtqs[pid].qs.push(q)

        //all get
        if (dtqs[pid].qs.length === input.num) {

            //order
            dtqs[pid].qs = _.orderBy(dtqs[pid].qs, 'input.n')

            //merge output
            output = _.join(_.map(dtqs[pid].qs, 'output'), '')

            //state
            state = 'finish'

            //modifyQueue, response result from lastone queue
            wo.modifyQueue(topic, id, input, output, state)

            //delete
            delete dtqs[pid]

        }

    }

})

