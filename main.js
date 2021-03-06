import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import undoable from 'redux-undo'
import focusReducer from './reducers/focus'
import segmentsReducer from './reducers/segments'
import Root from './components/Root'

const store = createStore(combineReducers({
  focus: focusReducer,
  segments: undoable(segmentsReducer)
}))

ReactDOM.render(<Provider store={store}>
  <Root />
</Provider>, document.getElementById('content'))
