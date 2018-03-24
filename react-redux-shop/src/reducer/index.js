import {combineReducers} from 'redux'
import cartreducer from './cartreducer'
import routereducer from './routereducer'
import addreducer from './addreducer'

const reducer = combineReducers({
    cartreducer,
    routereducer,
    addreducer
})

export default reducer;