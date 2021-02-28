export const addLibBook = (newLibBook, auth, userBookId, originalUserId) => {
    return {
      type: 'ADD_LIBRARY_BOOK',
      newLibBook,
      auth,
      userBookId,
      originalUserId
    }
}

export const updateLibBook = (book) => {
    return {
        type: 'UPDATE_LIBRARY_BOOK',
        book
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

export const addReservedBook = (newReservedBook) => {
    return {
        type: 'ADD_RESERVED_BOOK',
        newReservedBook
    }
}

export const updateReservedBook = (book) => {
    return {
        type: 'UPDATE_RESERVED_BOOK',
        book
    }
}

export const completeReservedBook = (book) => {
    return {
        type: 'COMPLETE_RESERVED_BOOK',
        book
    }
}

export const bookComments = (comments) => {
    return {
        type: 'BOOK_COMMENTS',
        comments
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

export const deleteComment = (id) => {
    return {
        type: 'DELETE_COMMENT',
        id
    }
}

export const addLike = (id, like) => {
    return {
        type: 'ADD_LIKE',
        id,
        like
    }
}

export const addCommentLike = (comment, user, likes) => {
    return {
        type: 'ADD_COMMENT_LIKE',
        comment,
        user,
        likes
    }
}

export const deleteLike = (like, likes) => {
    return {
        type: 'DELETE_LIKE',
        like,
        likes
    }
}

export const addReservedMessage = (message, user) => {
    return {
        type: 'ADD_RESERVED_MESSAGE',
        message,
        user
    }
}

export const deleteReservedMessage = (id) => {
    return {
        type: 'DELETE_RESERVED_MESSAGE',
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

export const showBook = (book, comments) => {
    return {
        type: 'SHOW_BOOK',
        book,
        comments
    }
}

export const removeShowBook = () => {
    return {
      type: 'REMOVE_SHOW_BOOK',
    }
  }

export const showReservedBook = (book, user, libBookId, id, messages) => {
    return {
        type: 'SHOW_RESERVED_BOOK',
        book,
        user,
        libBookId,
        id,
        messages
    }
}

export const removeShowReservedBook = () => {
    return {
      type: 'REMOVE_SHOW_RESERVED_BOOK',
    }
  }

export const showUser = (user) => {
    return {
        type: 'SHOW_USER',
        user
    }
}

export const removeShowUser = () => {
    return {
      type: 'REMOVE_SHOW_USER',
    }
  }

export const searchField = (string) => {
    return {
        type: 'SEARCH_BOOKS',
        string
    }
}

export const clearSearch = () => {
    return {
        type: 'CLEAR_SEARCH'
    }
}

export const addMessage = (msg) => {
    return {
        type: 'ADD_MESSAGE',
        msg
    }
}

export const markMessagesSeen = (user) => {
    return {
        type: 'MARK_MESSAGES_SEEN',
        user
    }
}

export const markMessagesRead = (id, user) => {
    return {
        type: 'MARK_MESSAGES_READ',
        id,
        user
    }
}

export const addFriendRequest = (friendReq) => {
    return {
        type: 'ADD_FRIEND_REQUEST',
        friendReq
    }
}

export const approveFriendRequest = (id) => {
    return {
        type: 'APPROVE_FRIEND_REQUEST',
        id
    }
}