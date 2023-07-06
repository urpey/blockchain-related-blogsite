import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from 'redux'
import { reducer } from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

declare global {
  /* tslint:disable:interface-name */
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let enhancer =
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeEnhancers(
    applyMiddleware(logger),
    applyMiddleware(thunk),
    applyMiddleware(logger)
  )

export let store = createStore(reducer, enhancer)
