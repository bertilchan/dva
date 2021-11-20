import * as sagaEffects from 'redux-saga/effects'
import {prefix} from './utils'

export default function createRootSaga(models) {
    function* rootSaga() {
        for(let model of models) {
            model.effects = prefix(model.effects,model.namespace)
            for(let key in model.effects) { // key 是 counter/asyncAdd 
                yield sagaEffects.takeEvery(key,function*(action){
                    yield model.effects[key](action,sagaEffects)
                })
            }
        }
    }
    return rootSaga
}
