import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import WConverwsClient from 'w-converws/src/WConverwsClient.mjs'


/**
 * 建立WebSocket使用者(Node.js與Browser)端物件
 *
 * Inherit: {@link https://yuda-lyu.github.io/w-converws/WConverwsClient.html WConverwsClient}
 *
 * @see {@link https://yuda-lyu.github.io/w-converws/WConverwsClient.html WConverwsClient}
 *
 * @class
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {String} [opt.url='ws://localhost:8080'] 輸入WebSocket伺服器ws網址，預設為'ws://localhost:8080'
 * @param {String} [opt.token='*'] 輸入使用者認證用token，預設為'*'
 * @returns {Object} 回傳通訊物件，可監聽事件open、openOnce、close、error、reconn、broadcast、deliver、queueChange，可執行事件pushQueue、modifyQueue、subTopic、unsubTopic
 * @example
 *
 * import WRunqwsClient from 'w-runqws/dist/w-runqws-client.umd.js'
 *
 * let opt = {
 *     url: 'ws://localhost:8080',
 *     token: '*',
 * }
 *
 * let missionTopic = 'refs|texts'
 *
 * //new
 * let wo = new WRunqwsClient(opt)
 *
 * wo.on('open', function() {
 *     console.log('client nodejs[port:8080]: open')
 *
 *     //subTopic
 *     wo.subTopic(missionTopic)
 *
 *     function addMission(n) {
 *
 *         //input
 *         let input = '#' + n
 *
 *         //option
 *         let option = {}
 *
 *         //pushQueue
 *         wo.pushQueue(missionTopic, input, option)
 *
 *     }
 *
 *     //mission
 *     let n = 0
 *     let t = setInterval(function() {
 *         n += 1
 *         addMission(n)
 *         if (n === 10) {
 *             clearInterval(t)
 *         }
 *     }, 50)
 *
 * })
 * wo.on('openOnce', function() {
 *     console.log('client nodejs[port:8080]: openOnce')
 * })
 * wo.on('close', function() {
 *     console.log('client nodejs[port:8080]: close')
 * })
 * wo.on('error', function(err) {
 *     console.log('client nodejs[port:8080]: error', err)
 * })
 * wo.on('reconn', function() {
 *     console.log('client nodejs[port:8080]: reconn')
 * })
 * wo.on('broadcast', function(data) {
 *     console.log('client nodejs[port:8080]: broadcast', data)
 * })
 * wo.on('deliver', function(data) {
 *     //console.log('client nodejs[port:8080]: deliver', data)
 * })
 * wo.on('queueChange', function(topic, id, input, output, state) {
 *     //console.log('client nodejs[port:8080]: queueChange', topic, id, input, output, state)
 *     console.log('queueChange', input, output, state)
 *
 *     //ready queue
 *     if (topic === missionTopic && state === 'ready') {
 *
 *         setTimeout(function() {
 *
 *             //output
 *             output = 'done(' + input.replace('#', '') + ')'
 *
 *             //state
 *             state = 'finish'
 *
 *             //modifyQueue
 *             wo.modifyQueue(topic, id, input, output, state)
 *
 *         }, 1000)
 *
 *     }
 *
 * })
 *
 */
function WRunqwsClient(opt = {}) {


    //cloneDeep
    opt = cloneDeep(opt)


    //default
    if (!opt.url) {
        opt.url = 'ws://localhost:8080'
    }
    if (!opt.token) {
        opt.token = '*'
    }


    //new
    let wcc = new WConverwsClient(opt)


    //deliver, 伺服器使用deliver給有訂閱主題的各客戶端資料
    wcc.on('deliver', function(data) {

        //topic
        let topic = get(data, 'topic', null)

        //check
        if (!topic) {
            return
        }

        //modify queue and emit
        wcc.emit('queueChange',
            get(data, 'topic', null),
            get(data, 'id', null),
            get(data, 'input', null),
            get(data, 'output', null),
            get(data, 'state', null)
        )

    })


    //pushQueue
    wcc.on('pushQueue', function(topic, input, option) {

        //_input
        let _input = {
            topic,
            input,
            option,
        }

        //execute
        wcc.execute('pushQueue', _input)
            .then(function(_output) {
                //console.log('pushQueue: then', _output)
            })
            .catch(function(err) {
                wcc.emit('error', 'pushQueue: catch', err)
            })

    })


    //modifyQueue
    wcc.on('modifyQueue', function(topic, id, input, output, state) {

        //_input
        let _input = {
            topic,
            id,
            input,
            output,
            state,
        }

        //execute
        wcc.execute('modifyQueue', _input)
            .then(function(_output) {
                //console.log('modifyQueue: then', _output)
            })
            .catch(function(err) {
                wcc.emit('error', 'modifyQueue: catch', err)
            })

    })


    //subTopic
    wcc.on('subTopic', function(topic) {

        //_input
        let _input = {
            topic,
        }

        //execute
        wcc.execute('subTopic', _input)
            .then(function(_output) {
                //console.log('subTopic: then', _output)
            })
            .catch(function(err) {
                wcc.emit('error', 'subTopic: catch', err)
            })

    })


    //unsubTopic
    wcc.on('unsubTopic', function(topic) {

        //_input
        let _input = {
            topic,
        }

        //execute
        wcc.execute('unsubTopic', _input)
            .then(function(_output) {
                //console.log('unsubTopic: then', _output)
            })
            .catch(function(err) {
                wcc.emit('error', 'unsubTopic: catch', err)
            })

    })


    /**
     * 佇列發佈事件
     *
     * @param {String} topic 輸入主題字串
     * @param {*} input 輸入佇列用之輸入任意資訊
     * @param {Object} [option={}] 輸入設定物件，預設{}
     * @param {Object} [option.transData=null] 輸入佇列移轉資訊物件
     * @param {String} [option.timeStart=null] 輸入佇列建立時間字串
     * @param {String} [option.timeExp=null] 輸入佇列失效時間字串
     * @param {String} [option.timeTakeStart=null] 輸入佇列被拿取時間字串
     * @param {String} [option.timeTakeExp=null] 輸入佇列被拿取失效時間字串
     */
    function pushQueue(topic, input, option = {}) {
        wcc.emit('pushQueue', topic, input, option)
    }
    wcc.pushQueue = pushQueue


    /**
     * 佇列變更事件
     *
     * @param {String} topic 輸入主題字串
     * @param {*} input 輸入佇列用之輸入任意資訊
     * @param {*} output 輸入佇列用之輸出任意資訊
     * @param {String} state 輸入佇列用之狀態字串
     */
    function modifyQueue(topic, id, input, output, state) {
        wcc.emit('modifyQueue', topic, id, input, output, state)
    }
    wcc.modifyQueue = modifyQueue


    /**
     * 訂閱事件
     *
     * @param {String} topic 輸入欲訂閱主題字串
     */
    function subTopic(topic) {
        wcc.emit('subTopic', topic)
    }
    wcc.subTopic = subTopic


    /**
     * 取消訂閱事件
     *
     * @param {String} topic 輸入欲取消主題字串
     */
    function unsubTopic(topic) {
        wcc.emit('unsubTopic', topic)
    }
    wcc.unsubTopic = unsubTopic


    return wcc
}


export default WRunqwsClient
