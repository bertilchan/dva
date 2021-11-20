// dva的基本使用
import React from 'react';
import dva, {connect} from './dva'
const app = dva()
const delay = ms => new Promise(function(resolve){
  setTimeout(() => {
    resolve()
  }, ms);
})
app.model({
  namespace: 'counter',
  state: {number:0},
  reducers: {
    add(state) {
      return {number:state.number+1}
    }
  },
  effects: {
    //call 和 put 都是 redux-saga 的 effects，call 表示调用异步函数，put 表示 dispatch action
    *asyncAdd(action,{put,call}) {
      yield call(delay,1000)
      yield put({type:'counter/add'})
    }
  }
})
// 将model和组件绑定起来
let Counter = connect(
  state => state.counter
)(
  props=>(
    <div>
      <p>{props.number}</p>
      <button onClick={()=>props.dispatch({type:'counter/add'})}>+</button>
      <button onClick={()=>props.dispatch({type:'counter/asyncAdd'})}>异步+1</button>
    </div>
  )
)
app.router(()=><Counter/>)
app.start('#root')