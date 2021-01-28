## Welcome to MyBrary!

MyBrary is a Web Application/Social Platfor for users to share and exchange physical copies of their favorite books. 

To get started, simply create a new profile by clicking "Sign Up" at the bottom of the login page. Then, login using your newly created credentials.

## Add Books

![Alt text](./public/login.png?raw=true "Login Screen")

At login, a user will be taken to their profile page where they can edit their personal information, or choose to add books to their Library or WishList by searching Google Books API. 

Adding books to the Library represents books the user owns and is willing to donate to the community. Once added, these books will appear on the Public Library Bookshelf, as well as the users Public Profile, for other users to reserve.

Adding books to the WishList will notify the user if this book exists in another user's Library, or once it is added to another user's library.

## Public Bookshelf

Once a user has added books to their profile and has navigated to the Public Bookshelf, a list of all Library and WishList Books (excluding those of the current user) will be available. Each book card is displayed with dynamic functionality based on it's current state (Available, Reserved, or Currently Reading). 

If the book is Available or Reserved, a Library Book card will display a button to navigate to the user's profile that currently owns that Library Book, and a button to navigate to that Books informational page with a public forum for making comments on that Book. 

If a book has a status of Currently Reading, this will only be available on the corresponding user's Pubilc Profile Currently Reading carousel. Books in Currently Reading status have been received from another user, and the recipient is not yet ready to list that book for Reservation by other users. Once a user is done reading a book, they can add this book to their public library from their profile. Users will also be able to add a Book to their WishList directly from another user's Currently Reading Carousel so that they will be notified when this book does become available. 
