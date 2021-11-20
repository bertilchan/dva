import {combineReducers} from 'redux'
import {prefix} from './utils'

export default function createReducers(models) {
    let reducers = {}
        for(let model of models) {
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
        return combineReducers(reducers)
}