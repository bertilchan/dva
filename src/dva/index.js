import React from 'react'
import ReactDOM from 'react-dom'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import {connect,Provider} from 'react-redux'
import * as effects from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
import createRootSaga from './createRootSaga'
import createReducers from './createReducers'
import {prefix} from './utils'

export {connect}
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
        let rootReducer = createReducers(app._models)
        let sagaMiddleware = createSagaMiddleware()
        let rootSaga = createRootSaga(app._models)
        let store = createStore(rootReducer,applyMiddleware(sagaMiddleware))
        sagaMiddleware.run(rootSaga) // 开始启动rootSaga执行
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