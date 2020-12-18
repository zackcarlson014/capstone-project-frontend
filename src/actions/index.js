export const addLibBook = (newLibBook, auth, userBookId) => {
    console.log(newLibBook, auth, userBookId)
    return {
      type: 'ADD_LIBRARY_BOOK',
      newLibBook,
      auth,
      userBookId
    }
}

export const deleteLibBook = (id) => {
    return {
        type: 'DELETE_LIBRARY_BOOK',
        id
    }
}

export const addWishBook = (newWishBook) => {
    return {
      type: 'ADD_WISHED_BOOK',
      newWishBook
    }
}

export const allLibraryBooks = (libBooks) => {
    return {
        type: 'ALL_LIBRARY_BOOKS',
        libBooks
    }
}

export const allWishedBooks = (wishBooks) => {
    return {
        type: 'ALL_WISHED_BOOKS',
        wishBooks
    }
}