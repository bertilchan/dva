import React from 'react'
import ReactDOM from 'react-dom'
import {createStore,combineReducers} from 'redux'
import {connect,Provider} from 'react-redux'
export {connect}
//给action type 增加命名空间前缀
function prefix(reducers,namespace) {
    let newReducers = {}
    for(let key in reducers) {
        newReducers[namespace+'/'+key] = reducers[key]
    }
    return newReducers
}
export default function() {
    const app = {
        _models: [],//存放着所有的模型
        model,//添加模型的方法
        _router:null,//此处存放着路由定义
        router,//定义路由的方法
        start
    }
    function model(model) {
        app._models.push(model)
    }
    function router(routerConfig) {
        app._router = routerConfig
    }
    function start(selector) {
        let reducers = {}
        for(let model of app._models) {
            let {namespace,state:initialState,reducers:modelReducers} = model
            let reducersWithPrefix = prefix(modelReducers,namespace) //key已经增加了命名空间前缀
            reducers[namespace] = function(state=initialState,action) {
                let reducer = reducersWithPrefix[action.type] //type = 'counter/add
                if(reducer) {
                    return reducer(state,action)
                }
                // 如果没有匹配到相应的reducer，则直接返回原来的状态
                return state // 总状态，相当于一个counter
            }
        }
        //合并所有的reducer
        let rootReducer = combineReducers(reducers)
        let store = createStore(rootReducer)
        let App = app._router
        ReactDOM.render(
            <Provider store={store}>
                <App/>
            </Provider>
            ,document.querySelector(selector)
        )
    }
    return app
}