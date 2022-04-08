import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import map from 'lodash/map'
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
 * @param {String} [opt.cl='queues'] 輸入使用資料表名稱字串，預設'queues'
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


        //_output
        let _output


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

            //insert queue
            await worm.insert(r)
                .then(function(msg) {
                    //console.log('pushQueue then', msg)

                    //emit
                    wcs.emit(topic, {
                        topic: topic,
                        id: id,
                        input: r.input,
                        output: r.output,
                        state: r.state,
                    })

                    //_output
                    _output = 'success'

                })
                .catch(function(msg) {
                    //console.log('pushQueue catch', msg)

                    //_output
                    _output = { err: msg }

                })

            //callback
            callback(_output)

        }
        else if (func === 'modifyQueue') {

            //id
            let id = get(_intput, 'id', null)

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
                await worm.save(r, { atomic: true })
                    .then(function(msg) {
                        //console.log('modifyQueue then', msg)

                        //emit
                        wcs.emit(topic, {
                            topic,
                            id,
                            input,
                            output,
                            state,
                        })

                        //_output
                        _output = 'success'

                    })
                    .catch(function(msg) {
                        //console.log('modifyQueue catch', msg)

                        //_output
                        _output = { err: msg }

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
            _output = 'success'

            //callback
            callback(_output)

        }
        else if (func === 'unsubTopic') {

            //off
            wcs.off(topic, wcs.deliverQueue)

            //unbind
            wcs.deliverQueue = null

            //_output
            _output = 'success'

            //callback
            callback(_output)

        }
        else if (func === 'delQueueByTopic') {

            //del queue by topic
            await worm.delAll({ topic: topic })
                .then(function(msg) {
                    //console.log('delQueueByTopic then', msg)

                    //_output
                    _output = 'success'

                })
                .catch(function(msg) {
                    //console.log('delQueueByTopic catch', msg)

                    //_output
                    _output = { err: msg }

                })

            //callback
            callback(_output)

        }
        else if (func === 'delQueueByID') {

            //id
            let id = get(_intput, 'id', null)

            //check
            if (id !== null) {

                //del queue by id
                await worm.delAll({ id: id })
                    .then(function(msg) {
                    //console.log('delQueueByID then', msg)

                        //_output
                        _output = 'success'

                    })
                    .catch(function(msg) {
                    //console.log('delQueueByID catch', msg)

                        //_output
                        _output = { err: msg }

                    })

            }
            else {

                //_output
                _output = { err: `can not find id` }

            }

            //callback
            callback(_output)

        }
        else if (func === 'delQueueByIDs') {

            //ids
            let ids = get(_intput, 'ids', null)

            //pms
            let pms = map(ids, function(id) {

                //del queue by id
                return worm.delAll({ id: id })

            })

            //map
            await Promise.all(pms)
                .then(function(msg) {
                    //console.log('delQueueByIDs then', msg)

                    //_output
                    _output = 'success'

                })
                .catch(function(msg) {
                    //console.log('delQueueByIDs catch', msg)

                    //_output
                    _output = { err: msg }

                })

            //callback
            callback(_output)

        }
        else if (func === 'delQueueByMatches') {

            //find
            let find = get(_intput, 'find', null)

            //del queue by find
            await worm.delAll(find)
                .then(function(msg) {
                    //console.log('delQueueByMatches then', msg)

                    //_output
                    _output = 'success'

                })
                .catch(function(msg) {
                    //console.log('delQueueByMatches catch', msg)

                    //_output
                    _output = { err: msg }

                })

            //callback
            callback(_output)

        }
        else if (func === 'getQueueByTopic') {

            //get queue by topic
            await worm.select({ topic: topic })
                .then(function(msg) {
                    //console.log('getQueueByTopic then', msg)

                    //_output
                    _output = msg

                })
                .catch(function(msg) {
                    //console.log('getQueueByTopic catch', msg)

                    //_output
                    _output = { err: msg }

                })

            //callback
            callback(_output)

        }
        else if (func === 'getQueueByID') {

            //id
            let id = get(_intput, 'id', null)

            //check
            if (id !== null) {

                //get queue by id
                await worm.select({ id: id })
                    .then(function(msg) {
                        //console.log('getQueueByID then', msg)

                        //_output
                        _output = msg

                    })
                    .catch(function(msg) {
                        //console.log('getQueueByID catch', msg)

                        //_output
                        _output = { err: msg }

                    })

            }
            else {

                //_output
                _output = { err: `can not find id` }

            }

            //callback
            callback(_output)

        }
        else if (func === 'getQueueByIDs') {

            //ids
            let ids = get(_intput, 'ids', null)

            //pms
            let pms = map(ids, function(id) {

                //get queue by id
                return worm.select({ id: id })

            })

            //map
            await Promise.all(pms)
                .then(function(msg) {
                    //console.log('getQueueByIDs then', msg)

                    //_output
                    _output = msg

                })
                .catch(function(msg) {
                    //console.log('getQueueByIDs catch', msg)

                    //_output
                    _output = { err: msg }

                })

            //callback
            callback(_output)

        }
        else if (func === 'getQueueByMatches') {

            //find
            let find = get(_intput, 'find', null)

            //get queue by find
            await worm.select(find)
                .then(function(msg) {
                    //console.log('getQueueByMatches then', msg)

                    //_output
                    _output = msg

                })
                .catch(function(msg) {
                    //console.log('getQueueByMatches catch', msg)

                    //_output
                    _output = { err: msg }

                })

            //callback
            callback(_output)

        }
        else {
            //其他執行函數
        }


    })


    return wcs
}


export default WRunqwsServer
