import { combineReducers } from 'redux'
import auth from './auth'
// import libraryBooks from './libraryBooks.js'
// import wishedBooks from './wishedBooks.js'
import showBook from './showBook.js'
import showReservedBook from './showReservedBook.js'
import showUser from './showUser.js'
import allLibraryBooks from './allLibraryBooks.js'
import allWishedBooks from './allWishedBooks.js'
import reservedBooks from './reservedBooks.js'
import allComments from './allComments.js'
import allMessages from './allMessages.js'
import searchField from './searchField.js'

export default combineReducers({
    auth,
    showBook,
    showReservedBook,
    showUser,
    allLibraryBooks,
    allWishedBooks,
    reservedBooks,
    allComments,
    allMessages,
    searchField
})