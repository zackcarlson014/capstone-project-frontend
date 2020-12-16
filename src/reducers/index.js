import { combineReducers } from 'redux'
import auth from './auth'
import libraryBooks from './libraryBooks.js'
import wishedBooks from './wishedBooks.js'

export default combineReducers({
    auth,
    libraryBooks,
    wishedBooks
})