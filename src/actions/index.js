export const addLibBook = (newLibBook) => {
    return {
      type: 'ADD_LIBRARY_BOOK',
      newLibBook
    }
}

export const addWishBook = (newWishBook) => {
    return {
      type: 'ADD_WISHED_BOOK',
      newWishBook
    }
}