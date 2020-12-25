export const addLibBook = (newLibBook, auth, userBookId) => {
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

export const addWishBook = (newWishBook, auth, userBookId) => {
    return {
      type: 'ADD_WISHED_BOOK',
      newWishBook,
      auth,
      userBookId
    }
}

export const deleteWishBook = (id) => {
    return {
        type: 'DELETE_WISHED_BOOK',
        id
    }
}

export const addComment = (comment, user, likes) => {
    return {
        type: 'ADD_COMMENT',
        comment,
        user,
        likes
    }
}

export const addLike = (comment, user, likes) => {
    return {
        type: 'ADD_LIKE',
        comment,
        user,
        likes
    }
}

export const deleteComment = (id) => {
    return {
        type: 'DELETE_COMMENT',
        id
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

export const allComments = (comments) => {
    return {
        type: 'SHOW_COMMENTS',
        comments
    }
}

export const showBook = (book, user) => {
    return {
        type: 'SHOW_BOOK',
        book,
        user
    }
}

export const showUser = (user) => {
    return {
        type: 'SHOW_USER',
        user
    }
}

