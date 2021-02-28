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
import myLikes from './myLikes.js'
import allComments from './allComments.js'
import allReservedMessages from './allReservedMessages.js'
import allMessages from './allMessages.js'
import friends from './friends.js'
import searchField from './searchField.js'

export default combineReducers({
    auth,
    allLibraryBooks,
    allWishedBooks,
    reservedBooks,
    allMessages,
    showBook,
    showReservedBook,
    showUser,
    myLikes,
    allComments,
    allReservedMessages,
    friends,
    searchField
})