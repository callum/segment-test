import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import focusedReducer from './reducers/focused'
import segmentsReducer from './reducers/segments'
import Root from './components/Root'

const store = createStore(combineReducers({
  focused: focusedReducer,
  segments: segmentsReducer
}))

ReactDOM.render(<Provider store={store}>
  <Root />
</Provider>, document.getElementById('content'))
