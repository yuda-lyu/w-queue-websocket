import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import WConverwsClient from 'w-converws/src/WConverwsClient.mjs'
import WQueue from 'w-queue/src/WQueue.mjs'


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
 * @returns {Object} 回傳通訊物件，可監聽事件open、openOnce、close、error、reconn、broadcast、deliver、queueChange，可執行事件pushQueue、modifyQueue、subTopic、unsubTopic、delQueueByTopic、delQueueByID、delQueueByIDs、delQueueByMatches
 * @example
 *
 * import WRunqwsClient from 'w-runqws/dist/w-runqws-client.umd.js'
 *
 * let opt = {
 *     url: 'ws://localhost:8080',
 *     token: '*',
 * }
 *
 * let missionTopic = 'parser|texts'
 *
 * //new
 * let wo = new WRunqwsClient(opt)
 *
 * wo.on('open', function() {
 *     console.log('client nodejs[port:8080]: open')
 *
 *     // //delQueueByTopic
 *     // wo.delQueueByTopic(missionTopic)
 *     //     .then(function(msg) {
 *     //         console.log('delQueueByTopic', msg)
 *     //     })
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
    if (!opt.takeNumLimit) {
        opt.takeNumLimit = 0
    }


    //wcc
    let wcc = new WConverwsClient(opt)


    //wq
    let wq = new WQueue(opt)


    //wq message
    wq.on('message', function(qs) {

        //get
        let data = wq.get()
        if (!data) {
            return
        }

        //emit
        wcc.emit('queueChange',
            get(data, 'topic', null),
            get(data, 'id', null),
            get(data, 'input', null),
            get(data, 'output', null),
            get(data, 'state', null),
            function() {

                //cb
                wq.cb()

            }
        )

    })


    //wcc deliver, 伺服器使用deliver給有訂閱主題的各客戶端資料
    wcc.on('deliver', function(data) {

        //topic
        let topic = get(data, 'topic', null)

        //check
        if (!topic) {
            return
        }

        //push data for queue
        wq.push(data)

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

        //_input
        let _input = {
            topic,
            input,
            option,
        }

        //execute
        return wcc.execute('pushQueue', _input)

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

        //_input
        let _input = {
            topic,
            id,
            input,
            output,
            state,
        }

        //execute
        return wcc.execute('modifyQueue', _input)

    }
    wcc.modifyQueue = modifyQueue


    /**
     * 訂閱事件
     *
     * @param {String} topic 輸入欲訂閱主題字串
     */
    function subTopic(topic) {

        //_input
        let _input = {
            topic,
        }

        //execute
        return wcc.execute('subTopic', _input)

    }
    wcc.subTopic = subTopic


    /**
     * 取消訂閱事件
     *
     * @param {String} topic 輸入欲取消主題字串
     */
    function unsubTopic(topic) {

        //_input
        let _input = {
            topic,
        }

        //execute
        return wcc.execute('unsubTopic', _input)

    }
    wcc.unsubTopic = unsubTopic


    /**
     * 由訂閱主題取得佇列
     *
     * @param {String} topic 輸入訂閱主題字串
     */
    function getQueueByTopic(topic) {

        //_input
        let _input = {
            topic,
        }

        //execute
        return wcc.execute('getQueueByTopic', _input)

    }
    wcc.getQueueByTopic = getQueueByTopic


    /**
     * 由佇列id取得佇列
     *
     * @param {String} id 輸入佇列id字串
     */
    function getQueueByID(id) {

        //_input
        let _input = {
            id,
        }

        //execute
        return wcc.execute('getQueueByID', _input)

    }
    wcc.getQueueByID = getQueueByID


    /**
     * 由佇列id陣列取得佇列
     *
     * @param {Array} ids 輸入佇列id字串陣列
     */
    function getQueueByIDs(ids) {

        //_input
        let _input = {
            ids,
        }

        //execute
        return wcc.execute('getQueueByIDs', _input)

    }
    wcc.getQueueByIDs = getQueueByIDs


    /**
     * 由查詢條件取得佇列
     *
     * @param {Object} find 輸入取得條件物件
     */
    function getQueueByMatches(find) {

        //_input
        let _input = {
            find,
        }

        //execute
        return wcc.execute('getQueueByMatches', _input)

    }
    wcc.getQueueByMatches = getQueueByMatches


    /**
     * 由訂閱主題刪除佇列
     *
     * @param {String} topic 輸入訂閱主題字串
     */
    function delQueueByTopic(topic) {

        //_input
        let _input = {
            topic,
        }

        //execute
        return wcc.execute('delQueueByTopic', _input)

    }
    wcc.delQueueByTopic = delQueueByTopic


    /**
     * 由佇列id刪除佇列
     *
     * @param {String} id 輸入佇列id字串
     */
    function delQueueByID(id) {

        //_input
        let _input = {
            id,
        }

        //execute
        return wcc.execute('delQueueByID', _input)

    }
    wcc.delQueueByID = delQueueByID


    /**
     * 由佇列id陣列刪除佇列
     *
     * @param {Array} ids 輸入佇列id字串陣列
     */
    function delQueueByIDs(ids) {

        //_input
        let _input = {
            ids,
        }

        //execute
        return wcc.execute('delQueueByIDs', _input)

    }
    wcc.delQueueByIDs = delQueueByIDs


    /**
     * 由刪除條件刪除佇列
     *
     * @param {Object} find 輸入刪除條件物件
     */
    function delQueueByMatches(find) {

        //_input
        let _input = {
            find,
        }

        //execute
        return wcc.execute('delQueueByMatches', _input)

    }
    wcc.delQueueByMatches = delQueueByMatches


    /**
     * 監聽佇列變更事件
     *
     * @memberof WRunqwsClient
     * @example
     * wo.on('queueChange', function() {
        *     ...
        * })
        */
    function onQueueChange() {} onQueueChange()


    return wcc
}


export default WRunqwsClient
