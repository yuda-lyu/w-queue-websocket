import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import genID from 'wsemi/src/genID.mjs'
import WConverwsServer from 'w-converws/src/WConverwsServer.mjs' //rollup編譯時得剔除ws與events
import WOrm from 'w-orm-mongodb/src/WOrmMongodb.mjs' //rollup編譯時得剔除mongodb與stream


/**
 * 建立WebSocket伺服器
 *
 * Inherit: {@link https://yuda-lyu.github.io/w-converws/WConverwsServer.html WConverwsServer}
 *
 * @see {@link https://yuda-lyu.github.io/w-converws/WConverwsServer.html WConverwsServer}
 *
 * @class
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {String} [opt.url='mongodb://127.0.0.1:27017'] 輸入連接資料庫字串，預設'mongodb://127.0.0.1:27017'
 * @param {String} [opt.db='wqws'] 輸入使用資料庫名稱字串，預設'wqws'
 * @param {String} [opt.cl='test'] 輸入使用資料表名稱字串，預設'queues'
 * @param {Integer} [opt.port=8080] 輸入WebSocket伺服器所在port，預設8080
 * @param {Function} opt.authenticate 輸入使用者身份認證函數，供伺服器端驗證之用，函數會傳入使用者端連線之token參數，回傳為Promise，resolve(true)為驗證通過，resolve(false)為驗證不通過
 * @returns {Object} 回傳通訊物件，可監聽事件open、error、clientChange、execute、broadcast、deliver，可使用函數broadcast
 * @example
 *
 * import WRunqwsServer from 'w-runqws/dist/w-runqws-server.umd.js'
 *
 * let opt = {
 *     mongoUrl: 'mongodb://username:password@127.0.0.1:27017',
 *     mongoDb: 'wqws',
 *     mongoCl: 'queues',
 *     port: 8080,
 *     authenticate: async function(token) {
 *         //使用token驗證使用者身份
 *         return new Promise(function(resolve, reject) {
 *             setTimeout(function() {
 *                 resolve(true)
 *             }, 1000)
 *         })
 *     },
 * }
 *
 * //new
 * let wo = new WRunqwsServer(opt)
 *
 * wo.on('open', function() {
 *     console.log(`Server running at: ws://localhost:${opt.port}`)
 *
 *     // //broadcast
 *     // let n = 0
 *     // setInterval(() => {
 *     //     n += 1
 *     //     wo.broadcast(`server: broadcast: hi(${n})`)
 *     // }, 1000)
 *
 *     // //show eventNames
 *     // setInterval(() => {
 *     //     console.log('eventNames:')
 *     //     _.each(wo.eventNames(), function(v) {
 *     //         console.log('    ', v, wo.listenerCount(v))
 *     //     })
 *     //     console.log('')
 *     // }, 1000)
 *
 * })
 * wo.on('error', function(err) {
 *     console.log(`Server[port:${opt.port}]: error`, err)
 * })
 * wo.on('clientChange', function(clients) {
 *     console.log(`Server[port:${opt.port}]: now clients: ${clients.length}`)
 * })
 * wo.on('execute', function(func, input, cb) {
 *     console.log(`Server[port:${opt.port}]: execute`, func, input)
 *
 *     // if (func === 'add') {
 *     //     let r = input.p1 + input.p2
 *     //     cb(r)
 *     // }
 *
 * })
 * wo.on('broadcast', function(data) {
 *     console.log(`Server[port:${opt.port}]: broadcast`, data)
 * })
 * wo.on('deliver', function(data) {
 *     console.log(`Server[port:${opt.port}]: deliver`, data)
 * })
 *
 */
function WRunqwsServer(opt = {}) {


    //cloneDeep
    opt = cloneDeep(opt)


    //default
    if (!opt.mongoUrl) {
        opt.mongoUrl = 'mongodb://127.0.0.1:27017'
    }
    if (!opt.mongoDb) {
        opt.mongoDb = 'wqws'
    }
    if (!opt.mongoCl) {
        opt.mongoCl = 'queues'
    }
    if (!opt.port) {
        opt.port = 8080
    }


    //worm
    let worm = WOrm({
        url: opt.mongoUrl,
        db: opt.mongoDb,
        cl: opt.mongoCl,
    })


    //new
    let wcs = new WConverwsServer(opt)


    //execute
    wcs.on('execute', async function(func, _intput, callback, sendData) {
        //console.log('execute', func, _intput)

        //check
        if (func !== 'pushQueue' && func !== 'modifyQueue' && func !== 'subTopic' && func !== 'unsubTopic') {
            return
        }

        //topic
        let topic = get(_intput, 'topic', null)


        //deliverQueue
        function deliverQueue(queue) {
            //console.log('deliverQueue', queue)

            //data
            let data = {
                _mode: 'deliver',
                data: queue,
            }

            //sendData
            sendData(data)

        }


        //func
        if (func === 'pushQueue') {

            //id
            let id = genID()

            //input
            let input = get(_intput, 'input', null)

            //option
            let option = get(_intput, 'option')

            //r
            let r = {
                topic: topic,
                id: id,
                input: input,
                output: null,
                transData: get(option, 'transData', null),
                timeStart: get(option, 'timeStart', null),
                timeExp: get(option, 'timeExp', null),
                timeTakeStart: get(option, 'timeTakeStart', null),
                timeTakeExp: get(option, 'timeTakeExp', null),
                state: 'ready',
            }

            //_output
            let _output

            //insert queue
            await worm.insert(r)
                .then(function(msg) {
                    //console.log('pushQueue insert then', msg)

                    //emit
                    wcs.emit(topic, {
                        topic: topic,
                        id: id,
                        input: r.input,
                        output: r.output,
                        state: r.state,
                    })

                    //_output
                    _output = 'pushQueue success'

                })
                .catch(function(msg) {
                    //console.log('pushQueue insert catch', msg)

                    //_output
                    _output = { err: `can not find: ${func}` }

                })

            //callback
            callback(_output)

        }
        else if (func === 'modifyQueue') {

            //id
            let id = get(_intput, 'id', null)

            //_output
            let _output

            //check
            if (id !== null) {

                //input
                let input = get(_intput, 'input', null)

                //output
                let output = get(_intput, 'output', null)

                //state
                let state = get(_intput, 'state', null)

                //r
                let r = {
                    id: id,
                    output: output,
                    state: state,
                }

                //save queue
                await worm.save(r)
                    .then(function(msg) {
                        //console.log('modifyQueue save then', msg)

                        //emit
                        wcs.emit(topic, {
                            topic,
                            id,
                            input,
                            output,
                            state,
                        })

                        //_output
                        _output = 'modifyQueue success'

                    })
                    .catch(function(msg) {
                        //console.log('modifyQueue save catch', msg)

                        //_output
                        _output = { err: `can not find: ${func}` }

                    })

            }
            else {

                //_output
                _output = { err: `can not find id` }

            }

            //callback
            callback(_output)

        }
        else if (func === 'subTopic') {

            //bind
            wcs.deliverQueue = deliverQueue

            //on
            wcs.on(topic, wcs.deliverQueue)

            //_output
            let _output = 'subTopic success'

            //callback
            callback(_output)

        }
        else if (func === 'unsubTopic') {

            //off
            wcs.off(topic, wcs.deliverQueue)

            //unbind
            wcs.deliverQueue = null

            //_output
            let _output = 'unsubTopic success'

            //callback
            callback(_output)

        }


    })


    return wcs
}


export default WRunqwsServer
